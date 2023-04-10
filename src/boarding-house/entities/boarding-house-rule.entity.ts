import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../../common/enums/lang.enum';
import { BoardingHouse } from './boarding-house.entity';

@Entity()
export class BoardingHouseRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Language, type: 'enum' })
  lang: Language;

  @Column()
  content: string;

  // Join user
  @Column()
  boardingHouseId: number;

  @ManyToOne(() => BoardingHouse, (item) => item.boardingHouseRules)
  @JoinColumn()
  boardingHouse: BoardingHouse;
  // End join user
}
