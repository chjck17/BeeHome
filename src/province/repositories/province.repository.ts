import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Province } from '../entities/province.entity';

@Injectable()
export class ProvinceRepository extends BaseRepository<Province> {
  constructor(dataSource: DataSource) {
    super(Province, dataSource);
  }
}
