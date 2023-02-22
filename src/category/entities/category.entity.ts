import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Product, (product: Product) => product.categories)
  @JoinTable()
  public product: Product[];
}
