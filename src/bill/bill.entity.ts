import { User } from 'src/auth/entities/user.entity';
import { BaseEntityWithoutDeleteAndVersion } from 'src/common/entities/base.entity';
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

  @Column({ length: 50, nullable: true })
  bankName: string;

  @Column({ length: 50, nullable: true })
  tradingCode: string;

  @Column({ length: 50, nullable: true })
  tradingTitle: string;

  @Column({ length: 50, nullable: true })
  amountOfMoney: string;

  @Column({ length: 50, nullable: true })
  status: string;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.bills)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user
}
