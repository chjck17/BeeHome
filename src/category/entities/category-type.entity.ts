import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../../common/enums/lang.enum';
import { Category } from './category.entity';
import { CategoryTypeDetail } from './category-type-detail.entity';
import { BaseEntity } from '../../common/entities/base.entity';
@Entity()
export class CategoryType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CategoryTypeDetail, (item) => item.categoryType)
  categoryTypeDetails: CategoryTypeDetail[];

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (item) => item.categoryTypes)
  @JoinColumn()
  category: Category;
}
