import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Bill } from './bill.entity';
import { BaseRepository } from 'src/common/repositories/base.repositories';

@Injectable()
export class BillRepository extends BaseRepository<Bill> {
  constructor(dataSource: DataSource) {
    super(Bill, dataSource);
  }
}
