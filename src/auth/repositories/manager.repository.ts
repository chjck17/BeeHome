import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Customer } from '../entities/customer.entity';
import { Manager } from '../entities/manager.entity';

@Injectable()
export class ManagerRepository extends BaseRepository<Manager> {
  constructor(dataSource: DataSource) {
    super(Manager, dataSource);
  }

  // async getUserByFirebaseId(firebaseId: string) {
  //   const [customer] = await this.find({ where: { firebaseId } });
  //   return customer;
  // }
}
