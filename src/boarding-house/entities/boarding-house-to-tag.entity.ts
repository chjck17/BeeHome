import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Floor } from '../../floor/entities/floor.entity';
import { BoardingHouse } from './boarding-house.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class BoardingHouseToTag {
  @PrimaryGeneratedColumn()
  id: number;

  // ---------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------
  @Column()
  boardingHouseId: number;

  @ManyToOne(() => BoardingHouse, (item) => item.boardingHouseToTags)
  @JoinColumn()
  boardingHouse: BoardingHouse;
}
