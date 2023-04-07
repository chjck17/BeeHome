import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { RoomAttributeDetail } from '../entities/room-attribute-detail.entity';

@Injectable()
export class RoomAttributeDetailRepository extends BaseRepository<RoomAttributeDetail> {
  constructor(dataSource: DataSource) {
    super(RoomAttributeDetail, dataSource);
  }
}
