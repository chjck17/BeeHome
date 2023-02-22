import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntityWithoutUpdateAndVersion } from '../../common/entities/base.entity';
import { GroupPolicy } from './group-policies.entity';
import { Policy } from './policies.entity';

@Entity({ name: 'group_to_policy' })
export class GroupToPolicy extends BaseEntityWithoutUpdateAndVersion {
  @PrimaryColumn({ name: 'policy_id' })
  policyId: number;

  @PrimaryColumn({ name: 'group_policy_key' })
  groupPolicyKey: string;

  @ManyToOne(() => Policy, (policies) => policies.groupToPolicies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'policy_id' })
  policy: Policy;

  @ManyToOne(
    () => GroupPolicy,
    (groupPolicies) => groupPolicies.groupToPolicies,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'group_policy_key' })
  groupPolicy: GroupPolicy;
}
