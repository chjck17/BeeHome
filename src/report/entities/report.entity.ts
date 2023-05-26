import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../auth/entities/user.entity';
import { ReportStatus } from '../enums/report.enum';
import { BoardingHouse } from 'src/boarding-house/entities/boarding-house.entity';
@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: ReportStatus.PROCESSING,
    enum: ReportStatus,
    nullable: true,
  })
  status: ReportStatus;

  @Column({ length: 300, nullable: true })
  title: string;

  @Column({ type: 'timestamptz' })
  dateReport: Date;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user
  //--------------------------------------------------------------------------

  // Join user
  @Column()
  boardingHouseId: number;

  @ManyToOne(() => BoardingHouse, (item) => item.reports)
  @JoinColumn()
  boardingHouse: BoardingHouse;
  // End join user
}
