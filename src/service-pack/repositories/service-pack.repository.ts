import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { ServicePack } from '../entities/service-pack.entity';

@Injectable()
export class ServicePackRepository extends BaseRepository<ServicePack> {
  constructor(dataSource: DataSource) {
    super(ServicePack, dataSource);
  }
}
