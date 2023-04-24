import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { BoardingHouse } from '../../boarding-house/entities/boarding-house.entity';
import { Comment } from './comment.entity';
@Entity()
export class CommentToBoardingHouse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Join user
  @Column()
  boardingHouseId: number;

  @ManyToOne(() => BoardingHouse, (item) => item.commentToBoardingHouses)
  @JoinColumn()
  boardingHouse: BoardingHouse;
  // End join user
  //--------------------------------------------------------------------------
  // Join user
  @Column()
  commentId: number;

  @ManyToOne(() => Comment, (item) => item.commentToBoardingHouses)
  @JoinColumn()
  comment: Comment;
  // End join user
}
