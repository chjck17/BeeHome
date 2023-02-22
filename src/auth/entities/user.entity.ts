import { UserToGroupPolicy } from 'src/casl/entities/user-to-group-policies.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from '../enums/user.enum';
import { Admin } from './admin.entity';
import { Customer } from './customer.entity';
import { Manager } from './manager.entity';
import { Merchant } from './merchant.entity';
import { UserToken } from './user-token.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserType, default: UserType.MERCHANT })
  type: UserType;

  @OneToOne(() => Merchant, (merchant) => merchant.user)
  merchant: Merchant;

  @OneToOne(() => Admin, (admin) => admin.user)
  admin: Admin;

  @OneToOne(() => Manager, (manager) => manager.user)
  manager: Manager;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;

  @OneToMany(
    () => UserToGroupPolicy,
    (userToGroupPolicies) => userToGroupPolicies.user,
  )
  userToGroupPolicies: UserToGroupPolicy[];

  // @OneToMany(() => File, (file) => file.uploader)
  // files: File[];

  // @OneToMany(() => Product, (product) => product.user)
  // products: Product[];

  // @OneToMany(() => ProductAttribute, (productAttr) => productAttr.user)
  // productAttributes: ProductAttribute[];

  // @OneToMany(() => Category, (cate) => cate.user)
  // categories: Category[];

  // // Join customer
  // @OneToMany(() => Customer, (customer) => customer.merchantUser)
  // customersOfMerchant: Customer[];
  // // End join customer

  // Join user_token
  @OneToMany(() => UserToken, (ut) => ut.user)
  userTokens: UserToken[];
  // End join user_token

  // @OneToMany(() => Tag, (tag) => tag.user)
  // tags: Tag[];

  // @OneToMany(() => ProductVariant, (pv) => pv.user)
  // productVariants: ProductVariant[];

  // @OneToMany(() => UserHistoryPoint, (uhp) => uhp.user)
  // userHistoryPoints: UserHistoryPoint[];

  // @OneToOne(() => UserPoint, (up) => up.user)
  // userPoint: UserPoint;
}
