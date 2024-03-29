import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { RoomImage } from '../room/entities/room-image.entity';
import { Lessor } from '../auth/entities/lessor.entity';
import { BoardingHouseImage } from '../boarding-house/entities/boarding-house-img.entity';
import { Customer } from '../auth/entities/customer.entity';

@Entity()
export class LocalFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @OneToMany(() => RoomImage, (item) => item.localFile)
  roomImages: RoomImage[];

  @OneToMany(() => BoardingHouseImage, (item) => item.localFile)
  boardingHouseImages: BoardingHouseImage[];

  @OneToOne(() => Lessor, (item) => item.avatar)
  avatarLessor: Lessor;

  @OneToOne(() => Customer, (item) => item.avatar)
  avatarCustomer: Customer;
}
