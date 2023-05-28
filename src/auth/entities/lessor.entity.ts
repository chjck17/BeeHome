import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UniqueWithSoftDelete } from '../../common/decorators/typeorm.decorator';

import { LessorRank, LessorStatus } from '../enums/lessor.enum';
import { User } from './user.entity';
import { LocalFile } from '../../local-file/local-file.entity';
import { PackType } from 'src/service-pack/enums/pack.enum';

@Entity()
export class Lessor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  @UniqueWithSoftDelete()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: LessorStatus })
  status: LessorStatus;

  @Column({ type: 'enum', enum: LessorRank, default: LessorRank.BASIC })
  rank: LessorRank;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'phone_number', length: 50, nullable: true })
  phoneNumber: string;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User, (user) => user.lessor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user

  // // Join event
  // @OneToMany(() => Event, (event) => event.Lessor)
  // events: Event[];
  // // End join event
  @Column({ type: 'enum', enum: PackType, default: PackType.FREE })
  packType: PackType;
  // Join file
  @Column({ name: 'avatar_id', nullable: true })
  avatarId: number;

  @OneToOne(() => LocalFile, (item) => item.avatarLessor)
  @JoinColumn({ name: 'avatar_id' })
  avatar: LocalFile;
  // End join file
}
