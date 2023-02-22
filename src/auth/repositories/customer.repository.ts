import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {
  constructor(dataSource: DataSource) {
    super(Customer, dataSource);
  }

  // async getUserByFirebaseId(firebaseId: string) {
  //   const [customer] = await this.find({ where: { firebaseId } });
  //   return customer;
  // }
}
