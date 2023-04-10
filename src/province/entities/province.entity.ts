import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { ProvinceType } from '../enums/province.enum';

@Entity()
export class Province extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  name: string;

  @Column({ type: 'enum', enum: ProvinceType })
  type: ProvinceType;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => Province, (p) => p.child)
  @JoinColumn()
  parent: Province;

  @OneToMany(() => Province, (p) => p.parent)
  child: Province[];
}
