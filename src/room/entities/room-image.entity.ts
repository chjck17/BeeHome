import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { RoomStatus } from '../enums/room.enum';
import { LocalFile } from '../../local-file/local-file.entity';
import { Room } from './room.entity';

@Entity()
export class RoomImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  localFileId: number;
  @ManyToOne(() => LocalFile, (item) => item.roomImages)
  @JoinColumn()
  localFile: LocalFile;
  //------------------------------------------------------------------------------
  @Column()
  roomId: number;
  @ManyToOne(() => Room, (item) => item.roomImages)
  @JoinColumn()
  room: Room;
}
