import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Room } from './room.entity';
import { CategoryType } from '../../category/entities/category-type.entity';

@Entity()
export class RoomToCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  //----------------------------------------------------------
  @Column()
  roomId: number;

  @ManyToOne(() => Room, (item) => item.roomToCategories)
  @JoinColumn()
  room: Room;
  //----------------------------------------------------------
  @Column()
  categoryTypeId: number;

  @ManyToOne(() => CategoryType, (item) => item.roomToCategories)
  @JoinColumn()
  categoryType: CategoryType;
}
