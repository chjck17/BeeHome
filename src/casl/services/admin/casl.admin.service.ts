import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { User } from '../../../auth/entities/user.entity';
import { TypeORMQueryResult } from '../../../common/dtos/sql-query-result.dto';
import {
  NotFoundExc,
  UnauthorizedExc,
} from '../../../common/exceptions/custom.exception';
import {
  CreateGroupPolicyAdminReqDto,
  DeleteManyGroupPoliciesAdminReqDto,
  GetListGroupPoliciesAdminReqDto,
  GetListPoliciesAdminReqDto,
  UpdateGroupPoliciesAdminReqDto,
} from '../../dtos/admin/req/casl.admin.req.dto';
import { GroupPolicyResDto } from '../../dtos/common/res/group-policies.res.dto';
import { PolicyResDto } from '../../dtos/common/res/policy.res.dto';
import { GroupToPolicy } from '../../entities/group-to-policy.entity';
import {
  GroupPolicyStatus,
  GroupPolicyType,
} from '../../enums/group-policy.enum';
// import { GroupPolicyRepository } from '../../repositories/group-policy.repository';
// import { GroupToPolicyRepository } from '../../repositories/group-to-policy.repository';
import { PolicyRepository } from '../../repositories/policy.repository';
import { CaslCommonService } from '../common/casl.common.service';
import { GroupPolicyRepository } from 'src/casl/repositories/group-policies.repository';
import { GroupToPolicyRepository } from 'src/casl/repositories/group-to-policies.repository';

@Injectable()
export class CaslAdminService {
  constructor(
    private groupPolicyRepo: GroupPolicyRepository,
    private policyRepo: PolicyRepository,
    private groupToPolicyRepo: GroupToPolicyRepository,
    private caslCommonService: CaslCommonService,
  ) {}

  async getListPolicies(dto: GetListPoliciesAdminReqDto) {
    const { limit, page, type } = dto;
    let { searchText } = dto;

    const qb = this.policyRepo.createQueryBuilder('p');

    if (searchText) {
      searchText = `%${searchText}%`;
      qb.andWhere('p.name ILIKE :searchText', { searchText });
    }
    if (type) {
      qb.andWhere('p.type = :type', { type });
    }

    const { items, meta } = await paginate(qb, { limit, page });
    const policies = items.map((item) => PolicyResDto.forAdmin(item));

    return new Pagination(policies, meta);
  }

  async getListGroupPolicies(dto: GetListGroupPoliciesAdminReqDto) {
    const { status, limit, page, type } = dto;
    let { searchText } = dto;

    const queryBuilder = this.groupPolicyRepo
      .createQueryBuilder('groupPolicy')
      .leftJoinAndSelect('groupPolicy.groupToPolicies', 'groupToPolicy')
      .leftJoinAndSelect('groupToPolicy.policy', 'policy');

    if (searchText) {
      searchText = `%${searchText}%`;
      queryBuilder.where('groupPolicy.name ILIKE :searchText', { searchText });
    }
    if (status)
      queryBuilder.andWhere('groupPolicy.status = :status', { status });

    if (type) queryBuilder.andWhere('groupPolicy.type = :type', { type });

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
      cacheQueries: true,
    });

    const groupPolicy = items.map((item) => GroupPolicyResDto.forAdmin(item));

    return new Pagination(groupPolicy, meta);
  }

  async getGroupPolicyById(id: number) {
    const groupPolicy = await this.groupPolicyRepo
      .createQueryBuilder('groupPolicy')
      .leftJoinAndSelect('groupPolicy.groupToPolicies', 'groupToPolicy')
      .leftJoinAndSelect('groupToPolicy.policy', 'policy')
      .loadRelationCountAndMap(
        'groupPolicy.totalMem',
        'groupPolicy.userToGroupPolicies',
      )
      .where('groupPolicy.id = :id', { id })
      .getOne();
    if (!groupPolicy) throw new NotFoundExc('common');

    return GroupPolicyResDto.forAdmin(groupPolicy);
  }

  @Transactional()
  async createGroupPolicy(reqData: CreateGroupPolicyAdminReqDto, user: User) {
    const { description, name, policyIds, type } = reqData;
    const groupPolicyKey = this.caslCommonService.transformNameToKey(name);

    await this.checkPolicies(policyIds);

    await this.caslCommonService.checkGroupPolicyKey(
      type,
      groupPolicyKey,
      user.id,
    );

    const groupPolicy = this.groupPolicyRepo.create({
      key: groupPolicyKey,
      name,
      description,
      status: GroupPolicyStatus.ACTIVE,
      type: type,
      ownerId: user.admin.userId,
    });

    await this.groupPolicyRepo.save(groupPolicy);
    await this.saveGroupToPolicies([], policyIds, groupPolicy.id);

    return this.getGroupPolicyById(groupPolicy.id);
  }

  @Transactional()
  async updateGroupPolicy(dto: UpdateGroupPoliciesAdminReqDto, user: User) {
    const { id, description, name, policyIds, status, type } = dto;

    const groupPolicy = await this.groupPolicyRepo.findOneOrThrowNotFoundExc({
      where: { id },
      relations: { groupToPolicies: true },
    });

    await this.checkPolicies(policyIds);

    await this.caslCommonService.checkGroupPolicyKey(
      type,
      groupPolicy.key,
      user.id,
    );
    await this.saveGroupToPolicies(
      groupPolicy.groupToPolicies,
      policyIds,
      groupPolicy.id,
    );

    await this.groupPolicyRepo.update(id, {
      key: this.caslCommonService.transformNameToKey(name),
      name,
      description,
      status,
      type,
    });

    return this.getGroupPolicyById(id);
  }

  private async checkPolicies(policyIds: number[]) {
    await Promise.all([
      policyIds.map((item) =>
        this.policyRepo.findOneByOrThrowNotFoundExc({ id: item }),
      ),
    ]);
  }

  private async saveGroupToPolicies(
    groupToPolicies: GroupToPolicy[],
    policyIds: number[],
    groupPolicyId: number,
  ) {
    const groupToPolicyIdsToRemove: number[] = [];
    const groupToPolicyToInsert: GroupToPolicy[] = [];

    for (const groupToPolicy of groupToPolicies) {
      if (!policyIds.includes(groupToPolicy.policyId)) {
        groupToPolicyIdsToRemove.push(groupToPolicy.id);
      }
    }

    for (const policyId of policyIds) {
      if (!groupToPolicies.some((item) => item.policyId === policyId)) {
        const groupToPolicy = this.groupToPolicyRepo.create({
          groupPolicyId,
          policyId,
        });
        groupToPolicyToInsert.push(groupToPolicy);
      }
    }

    await Promise.all([
      groupToPolicyIdsToRemove?.length &&
        this.groupToPolicyRepo.softDelete(groupToPolicyIdsToRemove),
      groupToPolicyToInsert?.length &&
        this.groupToPolicyRepo.insert(groupToPolicyToInsert),
    ]);
  }

  async deleteListGroupPolicies(
    reqData: DeleteManyGroupPoliciesAdminReqDto,
  ): Promise<TypeORMQueryResult> {
    const { groupPoliciesIds } = reqData;

    const groupPolicy = await this.groupPolicyRepo.findBy({
      id: In(groupPoliciesIds),
    });

    // admin can not edit group policy with type LESSOR
    groupPolicy.forEach((item) => {
      if (item.type === GroupPolicyType.LESSOR)
        throw new UnauthorizedExc('common');
    });

    return this.groupPolicyRepo.softDelete(groupPoliciesIds);
  }

  async deleteGroupPolicyById(id: number) {
    const groupPolicy = await this.groupPolicyRepo.findOneBy({ id: id });
    if (!groupPolicy) throw new NotFoundExc('common');

    // admin can not edit group policy with type LESSOR
    if (groupPolicy.type === GroupPolicyType.LESSOR)
      throw new UnauthorizedExc('common');

    return this.groupPolicyRepo.softDelete(id);
  }
}
