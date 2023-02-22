import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UniqueWithSoftDelete } from '../../common/decorators/typeorm.decorator';
import { AdminStatus } from '../enums/admin.enum';
import { User } from './user.entity';

@Entity()
export class Manager extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @UniqueWithSoftDelete()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ enum: AdminStatus, type: 'enum' })
  status: AdminStatus;

  @Column({ length: 255, nullable: true })
  name: string;
  // Join user
  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.manager, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  //End join user

  // // Join file
  // @Column({ nullable: true })
  // avatarId: number;

  // @ManyToOne(() => File)
  // @JoinColumn({ name: 'avatar_id' })
  // avatar: File;
  // // End join file
}
