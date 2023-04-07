import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from '../../common/enums/lang.enum';
import { CategoryType } from './category-type.entity';
import { BaseEntity } from '../../common/entities/base.entity';
@Entity()
export class CategoryTypeDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Language, type: 'enum' })
  lang: Language;

  @Column()
  name: string;

  // Join CategoryType
  @Column()
  categoryTypeId: number;

  @ManyToOne(() => CategoryType, (item) => item.categoryTypeDetails)
  @JoinColumn()
  categoryType: CategoryType;
  // End join CategoryType
}
