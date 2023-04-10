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
import { RoomAttributeDetail } from './room-attribute-detail.entity';
import { RoomAttributeTerm } from './room-attribute-term.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class RoomAttribute extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (item) => item.roomAttributes)
  @JoinColumn()
  user: User;

  @OneToMany(() => RoomAttributeDetail, (item) => item.roomAttribute)
  roomAttributeDetails: RoomAttributeDetail[];

  @OneToMany(() => RoomAttributeTerm, (item) => item.roomAttribute)
  roomAttributeTerms: RoomAttributeTerm[];
}
