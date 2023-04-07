import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Room } from './room.entity';
import { RoomAttributeTerm } from './room-attribute-term.entity';

@Entity()
export class RoomToAttribute extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  //------------------------------------------------------------------------------------
  @Column()
  roomId: number;
  @ManyToOne(() => Room, (item) => item.roomToAttributes)
  @JoinColumn()
  room: Room;
  //------------------------------------------------------------------------------------
  @Column()
  roomAttributeTermId: number;
  @ManyToOne(() => RoomAttributeTerm, (item) => item.roomToAttributes)
  @JoinColumn()
  roomAttributeTerm: RoomAttributeTerm;
}
