import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { CommentToBoardingHouse } from './commentToBoardingHouse.entity';
@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  star: string;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user
  //--------------------------------------------------------------------------
  @OneToMany(() => CommentToBoardingHouse, (item) => item.comment)
  commentToBoardingHouses: CommentToBoardingHouse[];
}
