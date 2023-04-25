import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';

import { BoardingHouseImage } from '../entities/boarding-house-img.entity';

@Injectable()
export class BoardingHouseImageRepository extends BaseRepository<BoardingHouseImage> {
  constructor(dataSource: DataSource) {
    super(BoardingHouseImage, dataSource);
  }
}
