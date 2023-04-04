import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Action, ActionAbility, Resource } from '../../common/enums/casl.enum';
import { ConstraintName } from '../../common/enums/constraint-name.enum';
import { GroupToPolicy } from './group-to-policy.entity';
import { PolicyType } from '../enums/policy.enum';
import { UniqueWithSoftDelete } from '../../common/decorators/typeorm.decorator';

@Entity()
@Unique(ConstraintName.UQ_POLICIES, ['action', 'resource', 'actionAbility'])
export class Policy extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Action })
  action: Action;

  @Column({ type: 'enum', enum: Resource })
  resource: Resource;

  @Column({ type: 'enum', enum: ActionAbility, name: 'action_ability' })
  actionAbility: ActionAbility;

  @Column()
  @UniqueWithSoftDelete()
  name: string;

  @Column({ type: 'enum', enum: PolicyType })
  type: PolicyType;

  @OneToMany(() => GroupToPolicy, (groupToPolicies) => groupToPolicies.policy, {
    cascade: ['insert'],
  })
  groupToPolicies: GroupToPolicy[];
}
