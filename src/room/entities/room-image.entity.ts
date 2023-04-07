import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { RoomStatus } from '../enums/room.enum';

@Entity()
export class RoomImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileId: number;

  @Column()
  roomId: number;
}
