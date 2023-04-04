import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutUpdateAndVersion } from '../../common/entities/base.entity';
import { GroupPolicy } from './group-policies.entity';
import { Policy } from './policies.entity';

@Entity({ name: 'group_to_policy' })
export class GroupToPolicy extends BaseEntityWithoutUpdateAndVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'policy_id' })
  policyId: number;

  @Column({ name: 'group_policy_id' })
  groupPolicyId: number;

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
  @JoinColumn({ name: 'group_policy_id' })
  groupPolicy: GroupPolicy;
}
