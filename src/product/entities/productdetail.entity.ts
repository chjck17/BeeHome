import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  country: string;
  @Column()
  Color: string;
  @OneToOne(() => Product, (product: Product) => product.detail)
  public product: Product;
}
