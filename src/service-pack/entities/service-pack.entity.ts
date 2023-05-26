import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { PackType } from '../enums/pack.enum';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class ServicePack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column()
  userId: number;

  @OneToOne(() => User, (item) => item.servicePack)
  @JoinColumn()
  user: User;
}
