import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { BoardingHouseDescription } from '../entities/boarding-house-description.entity';

@Injectable()
export class BoardingHouseDescriptionRepository extends BaseRepository<BoardingHouseDescription> {
  constructor(dataSource: DataSource) {
    super(BoardingHouseDescription, dataSource);
  }
}
