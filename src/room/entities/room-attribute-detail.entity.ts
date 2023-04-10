import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Language } from '../../common/enums/lang.enum';
import { RoomStatus } from '../enums/room.enum';
import { RoomAttribute } from './room-attribute.entity';

@Entity()
export class RoomAttributeDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Language, type: 'enum' })
  lang: Language;

  @Column()
  name: string;

  @Column()
  roomAttributeId: number;

  @ManyToOne(() => RoomAttribute, (item) => item.roomAttributeDetails)
  @JoinColumn()
  roomAttribute: RoomAttribute;
}
