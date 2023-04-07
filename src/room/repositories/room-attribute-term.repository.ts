import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { RoomAttributeTerm } from '../entities/room-attribute-term.entity';

@Injectable()
export class RoomAttributeTermRepository extends BaseRepository<RoomAttributeTerm> {
  constructor(dataSource: DataSource) {
    super(RoomAttributeTerm, dataSource);
  }
}
