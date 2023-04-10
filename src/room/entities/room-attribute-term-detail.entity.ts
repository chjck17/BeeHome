import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Language } from '../../common/enums/lang.enum';
import { RoomAttributeTerm } from './room-attribute-term.entity';

@Entity()
export class RoomAttributeTermDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Language, type: 'enum' })
  lang: Language;

  @Column()
  name: string;

  @Column()
  slug: string;

  //---------------------------------------------------
  @Column()
  roomAttributeTermId: number;

  @ManyToOne(() => RoomAttributeTerm, (item) => item.roomAttributeTermDetails)
  @JoinColumn()
  roomAttributeTerm: RoomAttributeTerm;
}
