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
import {
  AdminBoardingHouseStatus,
  Status,
} from '../../common/enums/status.enum';
import { BoardingHouseType } from '../enums/type.enum';
import { BoardingHouseAddress } from './boarding-house-address.entity';
import { BoardingHouseRule } from './boarding-house-rule.entity';
import { BoardingHouseRentDeposit } from './boarding-house-rent-deposit.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { BoardingHouseDescription } from './boarding-house-description.entity';
import { CommentToBoardingHouse } from '../../comment/entities/commentToBoardingHouse.entity';
import { BoardingHouseImage } from './boarding-house-img.entity';
import { Report } from 'src/report/entities/report.entity';

@Entity()
export class BoardingHouse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Status, type: 'enum' })
  status: Status;

  @Column({
    enum: AdminBoardingHouseStatus,
    type: 'enum',
    default: AdminBoardingHouseStatus.ACTIVE,
  })
  adminStatus: AdminBoardingHouseStatus;

  @Column({
    enum: BoardingHouseType,
    type: 'enum',
    default: BoardingHouseType.MOTEL,
  })
  type: BoardingHouseType;

  @Column()
  name: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  electricFee: string;

  @Column({ nullable: true })
  waterFee: string;

  @Column({ nullable: true })
  serviceFee: string;
  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.boardingHouses)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user

  @OneToMany(() => Floor, (item) => item.boardingHouse)
  floors: Floor[];

  @OneToMany(() => BoardingHouseToTag, (item) => item.boardingHouse)
  boardingHouseToTags: BoardingHouseToTag[];

  @OneToOne(() => BoardingHouseAddress, (item) => item.boardingHouse)
  boardingHouseAddress: BoardingHouseAddress;

  @OneToMany(() => BoardingHouseRule, (item) => item.boardingHouse)
  boardingHouseRules: BoardingHouseRule[];

  @OneToMany(() => Report, (item) => item.boardingHouse)
  reports: Report[];

  @OneToMany(() => BoardingHouseRentDeposit, (item) => item.boardingHouse)
  boardingHouseRentDeposits: BoardingHouseRentDeposit[];

  @OneToMany(() => BoardingHouseDescription, (item) => item.boardingHouse)
  boardingHouseDescriptions: BoardingHouseDescription[];

  @OneToMany(() => CommentToBoardingHouse, (item) => item.boardingHouse)
  commentToBoardingHouses: CommentToBoardingHouse[];

  @OneToMany(() => BoardingHouseImage, (item) => item.boardingHouse)
  boardingHouseImages: BoardingHouseImage[];
}
