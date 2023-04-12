import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { BoardingHouse } from '../../boarding-house/entities/boarding-house.entity';
import { Room } from '../../room/entities/room.entity';
@Entity()
export class Floor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  floorNumber: number;

  //--------------------------------------------------------------------------
  @Column()
  boardingHouseId: number;

  @ManyToOne(() => BoardingHouse, (user) => user.floors)
  @JoinColumn()
  boardingHouse: BoardingHouse;
  //--------------------------------------------------------------------------

  @OneToMany(() => Room, (item) => item.floor)
  rooms: Room[];
}
