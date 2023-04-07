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
import { Floor } from '../../floor/entities/floor.entity';
import { RoomToCategory } from './room-to-category.entity';
import { RoomToAttribute } from './room-to-attribute.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  acreage: string;

  @Column()
  status: RoomStatus;
  //--------------------------------------------------------------
  @Column()
  floorId: number;

  @ManyToOne(() => Floor, (item) => item.rooms)
  @JoinColumn()
  floor: Floor;
  //--------------------------------------------------------------
  @OneToMany(() => RoomToCategory, (item) => item.room)
  roomToCategories: RoomToCategory[];
  //--------------------------------------------------------------
  @OneToMany(() => RoomToAttribute, (item) => item.room)
  roomToAttributes: RoomToAttribute[];
}
