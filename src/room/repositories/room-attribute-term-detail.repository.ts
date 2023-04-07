import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { RoomAttributeTermDetail } from '../entities/room-attribute-term-detail.entity';

@Injectable()
export class RoomAttributeTermDetailRepository extends BaseRepository<RoomAttributeTermDetail> {
  constructor(dataSource: DataSource) {
    super(RoomAttributeTermDetail, dataSource);
  }
}
