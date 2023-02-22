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

  @Column({ unique: true })
  name: string;

  @OneToMany(() => GroupToPolicy, (groupToPolicies) => groupToPolicies.policy, {
    cascade: ['insert'],
  })
  groupToPolicies: GroupToPolicy[];
}
