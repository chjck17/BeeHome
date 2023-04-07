import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { BoardingHouse } from '../entities/boarding-house.entity';

@Injectable()
export class BoardingHouseRepository extends BaseRepository<BoardingHouse> {
  constructor(dataSource: DataSource) {
    super(BoardingHouse, dataSource);
  }
}
