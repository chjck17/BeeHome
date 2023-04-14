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
import { BoardingHouseToTag } from './boarding-house-to-tag.entity';
import { Status } from '../../common/enums/status.enum';
import { BoardingHouseType } from '../enums/type.enum';
import { Language } from '../../common/enums/lang.enum';
import { BoardingHouse } from './boarding-house.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class BoardingHouseRentDeposit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Language, type: 'enum' })
  lang: Language;

  @Column()
  content: string;

  // Join user
  @Column()
  boardingHouseId: number;

  @ManyToOne(() => BoardingHouse, (item) => item.boardingHouseRentDeposits)
  @JoinColumn()
  boardingHouse: BoardingHouse;
  // End join user
}
