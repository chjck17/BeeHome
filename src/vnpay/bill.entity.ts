import { User } from 'src/auth/entities/user.entity';
import { BaseEntityWithoutDeleteAndVersion } from 'src/common/entities/base.entity';
import { PackType } from 'src/service-pack/enums/pack.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bill extends BaseEntityWithoutDeleteAndVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.bills)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: PackType })
  packType: PackType;
  // End join user

  @Column()
  transactionId: string;

  @Column()
  transactionTitle: string;

  @Column()
  price: string;

  @Column()
  bank: string;

  @Column()
  cardType: string;
}
