import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutUpdateAndVersion } from '../../common/entities/base.entity';
import { UserTokenType } from '../enums/user-token.enum';
import { User } from './user.entity';

@Entity()
export class UserToken extends BaseEntityWithoutUpdateAndVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: UserTokenType, type: 'enum' })
  type: UserTokenType;

  @Column({ length: 256 })
  token: string;

  @Column({ nullable: true, type: 'timestamptz' })
  expiresAt: Date;

  // Join user
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.userTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user
}
