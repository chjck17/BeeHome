import { Injectable } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';
import { ExpectationFailedExc } from '../../../common/exceptions/custom.exception';
import { UpdateProfileAdminReqDto } from '../../dtos/admin/req/profile.admin.req.dto';
import { AdminResDto } from '../../dtos/common/res/admin.res.dto';
import { User } from '../../entities/user.entity';
import { AdminStatus } from '../../enums/admin.enum';
import { AdminRepository } from '../../repositories/admin.repository';

@Injectable()
export class ProfileAdminService {
  constructor(private adminRepo: AdminRepository) {}

  async getDetail(user: User) {
    const [admin] = await this.adminRepo.find({
      where: { userId: user.id, status: Not(AdminStatus.BANNED) },
      relations: {
        // avatar: true,
        user: {
          userToGroupPolicies: {
            groupPolicy: { groupToPolicies: { policy: true } },
          },
        },
      },
      relationLoadStrategy: 'query',
    });

    return AdminResDto.forAdmin(admin);
  }

  async update(dto: UpdateProfileAdminReqDto, user: User) {
    const { avatarId, name } = dto;

    const [admin] = await this.adminRepo.find({
      where: { userId: user.id, status: Not(AdminStatus.BANNED) },
    });

    // const { affected } = await this.adminRepo.update(
    //   { id: admin.id, deletedAt: IsNull() },
    //   { avatarId, name },
    // );

    // if (!affected) throw new ExpectationFailedExc(`Expectation failed`);

    return this.getDetail(user);
  }
}
