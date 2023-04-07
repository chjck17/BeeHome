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

@Entity()
export class BoardingHouse {
  @PrimaryGeneratedColumn()
  id: number;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user

  @OneToMany(() => Floor, (item) => item.boardingHouse)
  floors: Floor[];

  @OneToMany(() => BoardingHouseToTag, (item) => item.boardingHouse)
  boardingHouseToTags: BoardingHouseToTag[];
}
