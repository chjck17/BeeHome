import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import {
  Action,
  ActionAbility,
  Resource,
} from '../../../common/enums/casl.enum';
import { ADMIN_RESOURCE } from '../../constants/casl.constant';
import { PolicyType } from '../../enums/policy.enum';
import { PolicyRepository } from '../../repositories/policy.repository';

@Injectable()
export class CaslTaskService implements OnApplicationBootstrap {
  private logger = new Logger(CaslTaskService.name);
  constructor(private policyRepo: PolicyRepository) {}

  async onApplicationBootstrap() {
    this.syncPolicies().catch((err) => {
      this.logger.error(`Error syncPolicies`);
      this.logger.error(err);
    });
  }

  async syncPolicies() {
    const policies = await this.policyRepo.find();

    for (const resource of Object.values(Resource)) {
      const type = ADMIN_RESOURCE.includes(resource)
        ? PolicyType.ADMIN
        : PolicyType.COMMON;

      for (const action of Object.values(Action)) {
        for (const actionAbility of Object.values(ActionAbility)) {
          const name = this.policyRepo.genName(action, resource, actionAbility);
          let existedPolicy = policies.find(
            (item) =>
              item.action === action &&
              item.resource === resource &&
              item.actionAbility === actionAbility,
          );

          if (existedPolicy && existedPolicy.type !== type) {
            await this.policyRepo.update(existedPolicy.id, { type });
          }

          if (!existedPolicy) {
            existedPolicy = this.policyRepo.create({
              action,
              resource,
              actionAbility,
              name,
              type,
            });

            await this.policyRepo.insert(existedPolicy);
          }
        }
      }
    }
  }
}
