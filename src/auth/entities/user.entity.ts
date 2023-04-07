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
import { Lessor } from './lessor.entity';
import { UserToken } from './user-token.entity';
import { GroupPolicy } from '../../casl/entities/group-policies.entity';
import { Category } from '../../category/entities/category.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { RoomAttributeTerm } from '../../room/entities/room-attribute-term.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserType, default: UserType.LESSOR })
  type: UserType;

  @OneToOne(() => Lessor, (lessor) => lessor.user)
  lessor: Lessor;

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

  // join groupPolicy
  @OneToMany(() => GroupPolicy, (groupPolicy) => groupPolicy.owner)
  groupPolicies: GroupPolicy[];

  @OneToMany(() => UserToken, (ut) => ut.user)
  userTokens: UserToken[];
  // end join groupPolicy
  // @OneToMany(() => File, (file) => file.uploader)
  // files: File[];

  // @OneToMany(() => Product, (product) => product.user)
  // products: Product[];

  // @OneToMany(() => ProductAttribute, (productAttr) => productAttr.user)
  // productAttributes: ProductAttribute[];

  @OneToMany(() => Category, (cate) => cate.user)
  categories: Category[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => RoomAttributeTerm, (item) => item.user)
  roomAttributeTerms: RoomAttributeTerm[];
  // // Join customer
  // @OneToMany(() => Customer, (customer) => customer.lessorUser)
  // customersOfLessor: Customer[];
  // // End join customer

  // Join user_token

  // End join user_token

  // @OneToMany(() => Tag, (tag) => tag.user)
  // tags: Tag[];

  // @OneToMany(() => ProductVariant, (pv) => pv.user)
  // productVariants: ProductVariant[];

  // @OneToMany(() => UserHistoryPoint, (uhp) => uhp.user)
  // userHistoryPoints: UserHistoryPoint[];

  // @OneToOne(() => UserPoint, (up) => up.user)
  // userPoint: UserPoint;

  // @OneToMany(() => Room, (room) => room.user)
  // rooms: Room[];

  // @OneToMany(() => BoardingHouse, (boardingHouse) => boardingHouse.user)
  // boardingHouses: BoardingHouse[];

  // @OneToMany(() => Category, (categories) => categories.user)
  // categories: Category[];
}
