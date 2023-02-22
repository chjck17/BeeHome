import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { BaseEntityWithoutUpdateAndVersion } from '../../common/entities/base.entity';
import { GroupPolicy } from './group-policies.entity';

@Entity({ name: 'user_to_group_policy' })
export class UserToGroupPolicy extends BaseEntityWithoutUpdateAndVersion {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'group_policy_key' })
  groupPolicyKey: string;

  @ManyToOne(() => User, (user) => user.userToGroupPolicies, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => GroupPolicy,
    (groupPolicy) => groupPolicy.userToGroupPolicies,
    { onDelete: 'CASCADE', cascade: ['insert'] },
  )
  @JoinColumn({ name: 'group_policy_key' })
  groupPolicy: GroupPolicy;
}
