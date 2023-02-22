import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminRepository extends BaseRepository<Admin> {
  constructor(dataSource: DataSource) {
    super(Admin, dataSource);
  }
}
