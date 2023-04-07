import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { BoardingHouseToTag } from '../../boarding-house/entities/boarding-house-to-tag.entity';
import { User } from '../../auth/entities/user.entity';
@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user
  //--------------------------------------------------------------------------
  @OneToMany(() => BoardingHouseToTag, (item) => item.tag)
  boardingHouseToTags: BoardingHouseToTag[];
}
