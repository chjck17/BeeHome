import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Floor } from '../entities/floor.entity';

@Injectable()
export class FloorRepository extends BaseRepository<Floor> {
  constructor(dataSource: DataSource) {
    super(Floor, dataSource);
  }
}
