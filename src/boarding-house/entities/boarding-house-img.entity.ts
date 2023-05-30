import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { LocalFile } from '../../local-file/local-file.entity';
import { BoardingHouse } from './boarding-house.entity';

@Entity()
export class BoardingHouseImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  localFileId: number;
  @ManyToOne(() => LocalFile, (item) => item.boardingHouseImages)
  @JoinColumn()
  localFile: LocalFile;
  //------------------------------------------------------------------------------
  @Column()
  boardingHouseId: number;
  @ManyToOne(() => BoardingHouse, (item) => item.boardingHouseImages)
  @JoinColumn()
  boardingHouse: BoardingHouse;
}
