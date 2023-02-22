import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { GroupPolicyStatus } from '../enums/group-policy-status.enum';
import { GroupToPolicy } from './group-to-policy.entity';
import { UserToGroupPolicy } from './user-to-group-policies.entity';

@Entity({ name: 'group_policy' })
export class GroupPolicy extends BaseEntity {
  @PrimaryColumn()
  key: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ enum: GroupPolicyStatus, type: 'enum' })
  status: GroupPolicyStatus;

  @OneToMany(
    () => GroupToPolicy,
    (groupToPolicies) => groupToPolicies.groupPolicy,
    { cascade: ['insert'] },
  )
  groupToPolicies: GroupToPolicy[];

  @OneToMany(
    () => UserToGroupPolicy,
    (userToGroupPolicy) => userToGroupPolicy.groupPolicy,
    { cascade: ['insert'] },
  )
  userToGroupPolicies: UserToGroupPolicy[];
}
