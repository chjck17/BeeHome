import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UniqueWithSoftDelete } from '../../common/decorators/typeorm.decorator';

import { MerchantRank, MerchantStatus } from '../enums/merchant.enum';
import { User } from './user.entity';

@Entity()
export class Merchant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  @UniqueWithSoftDelete()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: MerchantStatus })
  status: MerchantStatus;

  @Column({ type: 'enum', enum: MerchantRank, default: MerchantRank.BASIC })
  rank: MerchantRank;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'phone_number', length: 50, nullable: true })
  phoneNumber: string;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User, (user) => user.merchant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user

  // // Join event
  // @OneToMany(() => Event, (event) => event.merchant)
  // events: Event[];
  // // End join event

  // // Join file
  // @Column({ name: 'avatar_id', nullable: true })
  // avatarId: number;

  // @OneToOne(() => File)
  // @JoinColumn({ name: 'avatar_id' })
  // avatar: File;
  // // End join file
}
