import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../../common/enums/lang.enum';
import { BoardingHouse } from './boarding-house.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class BoardingHouseDescription extends BaseEntity {
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
