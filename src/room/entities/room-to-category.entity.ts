import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Room } from './room.entity';

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
  categoryId: number;

  @ManyToOne(() => Category, (item) => item.roomToCategories)
  @JoinColumn()
  category: Category;
}
