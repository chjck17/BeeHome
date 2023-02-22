import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { CustomerStatus } from '../enums/customer.enum';
import { User } from './user.entity';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  phoneNumber: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'timestamptz', nullable: true })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: CustomerStatus,
    default: CustomerStatus.ACTIVE,
  })
  status: CustomerStatus;

  // @Column()
  // firebaseId: string;

  @Column({ length: 255 })
  password: string;

  // Join user
  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user

  // // Join merchant_user
  // @Column({ name: 'merchant_user_id' })
  // merchantUserId: number;

  // @ManyToOne(() => User, (user) => user.customer)
  // @JoinColumn({ name: 'merchant_user_id' })
  // merchantUser: User;
  // // End join merchant_user

  // @Column({ name: 'avatar_id', nullable: true })
  // avatarId: number;

  // @OneToOne(() => File, (file) => file.customer)
  // @JoinColumn({ name: 'avatar_id' })
  // avatar: File;
}
