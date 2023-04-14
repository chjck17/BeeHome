import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Floor } from '../../floor/entities/floor.entity';
import { BoardingHouseToTag } from './boarding-house-to-tag.entity';
import { Status } from '../../common/enums/status.enum';
import { BoardingHouseType } from '../enums/type.enum';
import { BoardingHouse } from './boarding-house.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class BoardingHouseAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column()
  province: string;

  @Column()
  ward: string;

  @Column()
  district: string;

  // Join user
  @Column()
  boardingHouseId: number;

  @OneToOne(() => BoardingHouse, (item) => item.boardingHouseAddress)
  @JoinColumn()
  boardingHouse: BoardingHouse;
  // End join user
}
