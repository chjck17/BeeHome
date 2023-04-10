import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { BoardingHouse } from '../entities/boarding-house.entity';
import { BoardingHouseRentDeposit } from '../entities/boarding-house-rent-deposit.entity';

@Injectable()
export class BoardingHouseRentDepositRepository extends BaseRepository<BoardingHouseRentDeposit> {
  constructor(dataSource: DataSource) {
    super(BoardingHouseRentDeposit, dataSource);
  }
}
