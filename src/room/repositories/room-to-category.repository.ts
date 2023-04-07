import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { RoomToCategory } from '../entities/room-to-category.entity';

@Injectable()
export class RoomToCategoryRepository extends BaseRepository<RoomToCategory> {
  constructor(dataSource: DataSource) {
    super(RoomToCategory, dataSource);
  }
}
