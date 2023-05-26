import { Expose, Transform } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import { IPolicies } from 'src/common/interfaces/casl.interface';

export class UserWithPoliciesDto extends User {
  // Transform from array group policies, each group has array policies
  //    to just array policies
  @Expose()
  @Transform(({ obj }: { obj: User }) => {
    const value = obj.userToGroupPolicies.reduce(
      (result: IPolicies[], userToGroupPoliciesItem) => {
        userToGroupPoliciesItem?.groupPolicy?.groupToPolicies?.forEach(
          (groupToPoliciesItem) => {
            const policy: IPolicies = {
              action: groupToPoliciesItem.policy.action,
              resource: groupToPoliciesItem.policy.resource,
              actionAbility: groupToPoliciesItem.policy.actionAbility,
            };
            const isConflict = result.some(
              (item) =>
                item.action === policy.action &&
                item.resource === policy.resource &&
                item.actionAbility === policy.actionAbility,
            );
            if (!isConflict) {
              result.push(policy);
            }
          },
        );
        return result;
      },
      [],
    );
    return value;
  })
  policies: IPolicies[];
}
