import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { CategoryType } from './category-type.entity';
import { CategoryDetail } from './category-detail.entity';
import { RoomToCategory } from '../../room/entities/room-to-category.entity';
import { BaseEntity } from '../../common/entities/base.entity';
@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user
  @OneToMany(() => RoomToCategory, (item) => item.room)
  roomToCategories: RoomToCategory[];

  @OneToMany(() => CategoryType, (item) => item.category)
  categoryTypes: CategoryType[];

  @OneToMany(() => CategoryDetail, (item) => item.category)
  categoryDetails: CategoryDetail[];
}
