import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { BoardingHouseAddress } from '../entities/boarding-house-address.entity';

@Injectable()
export class BoardingHouseAddressRepository extends BaseRepository<BoardingHouseAddress> {
  constructor(dataSource: DataSource) {
    super(BoardingHouseAddress, dataSource);
  }
}
