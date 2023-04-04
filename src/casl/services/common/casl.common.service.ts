import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { UserRepository } from '../../../auth/repositories/user.repository';
import {
  BadRequestExc,
  ConflictExc,
} from '../../../common/exceptions/custom.exception';
import {
  GroupPolicyStatus,
  GroupPolicyType,
} from '../../enums/group-policy.enum';
import { GroupPolicyRepository } from '../../repositories/group-policies.repository';
// import { GroupPolicyRepository } from '../../repositories/group-policy.repository';

@Injectable()
export class CaslCommonService {
  constructor(
    private groupPolicyRepo: GroupPolicyRepository,
    private userRepo: UserRepository,
  ) {}

  transformNameToKey(name: string): string {
    return name.toLowerCase().replace(/ /g, '_');
  }

  async checkGroupPolicyKey(
    type: GroupPolicyType,
    key: string,
    ownerId: number,
  ) {
    let isExisted: any;

    switch (type) {
      case GroupPolicyType.LESSOR:
        isExisted = await this.groupPolicyRepo.findOneBy([
          { type, key, ownerId },
          { type: GroupPolicyType.COMMON, key },
        ]);
        if (isExisted) {
          throw new BadRequestExc('common');
        }
        break;

      case GroupPolicyType.COMMON:
        isExisted = await this.groupPolicyRepo.findOneBy({
          key,
        });

        if (isExisted) {
          throw new ConflictExc('common');
        }
        break;

      case GroupPolicyType.ADMIN:
        isExisted = await this.groupPolicyRepo.find({
          where: { key, type: In([type, GroupPolicyType.COMMON]) },
        });

        if (isExisted) {
          throw new ConflictExc('common');
        }
        break;

      default:
        throw new Error(`Invalid group policy type: ${type}`);
    }
  }

  // This function is used by jwt-casl.strategy.ts
  async getAdminUserWithPolicies(userId: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
        userToGroupPolicies: {
          groupPolicy: { status: GroupPolicyStatus.ACTIVE },
        },
      },
      relations: {
        userToGroupPolicies: {
          groupPolicy: { groupToPolicies: { policy: true } },
        },
        admin: true,
      },
    });

    return user;
  }

  async getMerchantUserWithPolicies(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: {
        userToGroupPolicies: {
          groupPolicy: { groupToPolicies: { policy: true } },
        },
        // merchant: { parent: true },
      },
    });

    return user;
  }
}
