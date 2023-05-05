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
import { Room } from '../../room/entities/room.entity';
import { PartialIndexWithSoftDelete } from '../../common/decorators/typeorm.decorator';
@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  dateMeet: Date;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  phoneNumber: string;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user
  //--------------------------------------------------------------------------

  // Join user
  @Column()
  roomId: number;

  @ManyToOne(() => Room, (item) => item.books)
  @JoinColumn()
  room: Room;
  // End join user
}
