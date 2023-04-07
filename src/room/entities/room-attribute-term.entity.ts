import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { RoomStatus } from '../enums/room.enum';
import { RoomAttributeTermDetail } from './room-attribute-term-detail.entity';
import { RoomToAttribute } from './room-to-attribute.entity';
import { RoomAttribute } from './room-attribute.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class RoomAttributeTerm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (item) => item.roomAttributeTerms)
  @JoinColumn()
  user: User;

  @OneToMany(() => RoomToAttribute, (item) => item.roomAttributeTerm)
  roomToAttributes: RoomToAttribute[];

  @OneToMany(() => RoomAttribute, (item) => item.roomAttributeTerm)
  roomAttributes: RoomAttribute[];

  @OneToMany(() => RoomAttributeTermDetail, (item) => item.roomAttributeTerm)
  roomAttributeTermDetails: RoomAttributeTermDetail[];
}
