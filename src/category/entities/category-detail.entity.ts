import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../../common/enums/lang.enum';
import { Category } from './category.entity';
import { BaseEntity } from '../../common/entities/base.entity';
@Entity()
export class CategoryDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Language, type: 'enum' })
  lang: Language;

  @Column()
  name: string;

  // Join Category
  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (item) => item.categoryDetails)
  @JoinColumn()
  category: Category;
  // End join Category
}
