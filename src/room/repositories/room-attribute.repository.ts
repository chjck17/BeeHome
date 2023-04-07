import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { RoomAttribute } from '../entities/room-attribute.entity';

@Injectable()
export class RoomAttributeRepository extends BaseRepository<RoomAttribute> {
  constructor(dataSource: DataSource) {
    super(RoomAttribute, dataSource);
  }
}
