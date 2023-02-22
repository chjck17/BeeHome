import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { IPolicies } from 'src/common/interfaces/casl.interface';
import { Action, ActionAbility, Resource } from '../common/enums/casl.enum';
import { UserWithPoliciesDto } from './dtos/transform/userWithPolicies.dto';

export type AppAbility = PureAbility<[Action, Resource]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(user: UserWithPoliciesDto) {
    const { can, cannot, build } = new AbilityBuilder(
      PureAbility as AbilityClass<AppAbility>,
    );

    //  Cannot will overwrite can so we just need loop through can
    //  And we loop through cannot to overwrite can
    user.policies.forEach((policy: IPolicies) => {
      if (policy.actionAbility === ActionAbility.CAN) {
        can(policy.action, policy.resource);
      }
    });

    user.policies.forEach((policy: IPolicies) => {
      if (policy.actionAbility === ActionAbility.CANNOT) {
        cannot(policy.action, policy.resource);
      }
    });

    return build();
  }
}
