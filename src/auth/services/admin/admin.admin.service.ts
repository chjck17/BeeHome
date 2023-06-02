import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional';
import { UserToGroupPolicy } from '../../../casl/entities/user-to-group-policies.entity';
import { GroupPolicyRepository } from '../../../casl/repositories/group-policies.repository';
import { UserToGroupPolicyRepository } from '../../../casl/repositories/user-to-group-policies.repository';
import { DeleteMultipleByIdNumberReqDto } from '../../../common/dtos/delete-multiple.dto';
import {
  ExpectationFailedExc,
  NotFoundExc,
} from '../../../common/exceptions/custom.exception';
import { EncryptService } from '../../../utils/services/encrypt.service';

import {
  CreateAdminReqDto,
  ListAdminReqDto,
  UpdateAdminReqDto,
} from '../../dtos/admin/req/admin.admin.req.dto';
import { AdminResDto } from '../../dtos/common/res/admin.res.dto';
import { User } from '../../entities/user.entity';
import { AdminStatus } from '../../enums/admin.enum';
import { UserType } from '../../enums/user.enum';
import { AdminRepository } from '../../repositories/admin.repository';
import { UserRepository } from '../../repositories/user.repository';
import { BoardingHouseRepository } from 'src/boarding-house/repositories/boarding-house.repository';
import { CustomerRepository } from 'src/auth/repositories/customer.repository';
import { LessorRepository } from 'src/auth/repositories/lessor.repository';
import { ReportRepository } from 'src/report/repositories/report.repository';

@Injectable()
export class AdminAdminService {
  constructor(
    private adminRepo: AdminRepository,
    private userRepo: UserRepository,
    private boardingHouseRepo: BoardingHouseRepository,
    private customerRepo: CustomerRepository,
    private reportRepo: ReportRepository,
    private lessorRepo: LessorRepository,

    private groupPolicyRepo: GroupPolicyRepository,

    private userToGroupPolicyRepo: UserToGroupPolicyRepository,
    private encryptService: EncryptService,
  ) {}

  async getList(dto: ListAdminReqDto) {
    const { limit, page, status } = dto;
    let { searchText } = dto;

    const queryBuilder = this.adminRepo.createQueryBuilder('admin');

    if (searchText) {
      searchText = `%${searchText}%`;
      queryBuilder.where('admin.username ILIKE :searchText', { searchText });
    }

    if (status) queryBuilder.where('admin.status = :status', { status });

    const { items, meta } = await paginate(queryBuilder, { page, limit });

    const admins = items.map((item) => AdminResDto.forAdmin(item));
    return new Pagination(admins, meta);
  }

  async getDetail(id: number) {
    const admin = await this.adminRepo.findOne({
      where: { id },
      relations: { user: { userToGroupPolicies: { groupPolicy: true } } },
    });

    if (!admin) throw new NotFoundExc('Admin detail not found');
    return AdminResDto.forAdmin(admin);
  }

  async getAdminStatistical() {
    const queryBuilder =
      this.boardingHouseRepo.createQueryBuilder('boardingHouse');
    const count = await queryBuilder.getCount();

    const queryBuilderLessor =
      this.lessorRepo.createQueryBuilder('boardingHouse');
    const countLessor = await queryBuilderLessor.getCount();

    const queryBuilderCustomer =
      this.customerRepo.createQueryBuilder('boardingHouse');
    const countCustomer = await queryBuilderCustomer.getCount();

    const queryBuilderReport =
      this.reportRepo.createQueryBuilder('boardingHouse');
    const countReport = await queryBuilderReport.getCount();
    return {
      amountBoardingHouse: count,
      amountLessor: countLessor,
      amountCustomer: countCustomer,
      amountReport: countReport,
    };
  }

  @Transactional()
  async create(dto: CreateAdminReqDto) {
    const { username, password, groupPolicyKeys } = dto;
    const encryptedPassword = this.encryptService.encryptText(password);

    const user = await this.userRepo.save({ type: UserType.ADMIN });

    await Promise.all(
      groupPolicyKeys.map(async (item) => {
        const groupPolicy =
          await this.groupPolicyRepo.findOneByOrThrowNotFoundExc({
            key: item,
          });

        await this.userToGroupPolicyRepo.save({
          groupPolicy,
          user,
        });
      }),
    );

    const admin = this.adminRepo.create({
      username,
      password: encryptedPassword,
      user,
      status: AdminStatus.ACTIVE,
    });
    await this.adminRepo.save(admin);

    return this.getDetail(admin.id);
  }

  @Transactional()
  async update(dto: UpdateAdminReqDto) {
    const { adminId, status, groupPolicyKeys } = dto;

    let admin = await this.adminRepo.findOne({
      where: { id: adminId },
      relations: { user: { userToGroupPolicies: true } },
    });
    if (!admin) throw new NotFoundExc('Admin not found');

    admin = { ...admin, status };

    await Promise.all([
      this.updateAdminToGroupPolicies(admin.user, groupPolicyKeys),
      this.adminRepo.save(admin),
    ]);

    return this.getDetail(admin.id);
  }

  @Transactional()
  async deleteList(dto: DeleteMultipleByIdNumberReqDto) {
    const { ids } = dto;
    const { affected } = await this.adminRepo.softDelete(ids);

    if (affected !== ids.length) throw new ExpectationFailedExc('Invalid data');
  }

  @Transactional()
  async deleteSingle(id: number) {
    const { affected } = await this.adminRepo.softDelete(id);
    if (!affected) throw new NotFoundExc('Admin not found');
  }

  private async updateAdminToGroupPolicies(
    user: User,
    groupPolicyKeys: string[],
  ) {
    const removeUserGroupPolicies: UserToGroupPolicy[] = [];
    const addUserGroupPolicies: UserToGroupPolicy[] = [];

    user.userToGroupPolicies.filter((item) => {
      const isExisted = groupPolicyKeys.includes(item.groupPolicyKey);
      if (isExisted) return true;

      removeUserGroupPolicies.push(item);
      return false;
    });

    groupPolicyKeys.forEach((groupPolicyKey) => {
      const isExisted = user.userToGroupPolicies.some(
        (item) => item.groupPolicyKey === groupPolicyKey,
      );
      if (isExisted) return;

      const userGroupPolicy = this.userToGroupPolicyRepo.create({
        groupPolicyKey,
        userId: user.id,
      });
      addUserGroupPolicies.push(userGroupPolicy);
      user.userToGroupPolicies.push(userGroupPolicy);
    });

    await Promise.all([
      this.userToGroupPolicyRepo.softRemove(removeUserGroupPolicies),
      this.userToGroupPolicyRepo.save(addUserGroupPolicies),
    ]);
  }
}
