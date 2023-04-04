import { Injectable } from '@nestjs/common';
import { NotFoundExc } from 'src/common/exceptions/custom.exception';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Policy } from '../entities/policies.entity';
import { Action, ActionAbility, Resource } from '../../common/enums/casl.enum';

@Injectable()
export class PolicyRepository extends BaseRepository<Policy> {
  constructor(dataSource: DataSource) {
    super(Policy, dataSource);
  }

  async getPoliciesByIdsAndCheckErr(policyIds: number[]) {
    const policies = await Promise.all(
      policyIds.map(async (policyId) => this.findOneBy({ id: policyId })),
    );

    //  Check policies exist
    policies.forEach((policiesEntity) => {
      if (!policiesEntity) throw new NotFoundExc('Policies not found');
    });
    return policies;
  }
  genName(action: Action, resource: Resource, actionAbility: ActionAbility) {
    return `${actionAbility} ${action} ${resource}`;
  }
}
