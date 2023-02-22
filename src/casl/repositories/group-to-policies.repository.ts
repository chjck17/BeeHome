import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { GroupToPolicy } from '../entities/group-to-policy.entity';

@Injectable()
export class GroupToPolicyRepository extends BaseRepository<GroupToPolicy> {
  constructor(dataSource: DataSource) {
    super(GroupToPolicy, dataSource);
  }
}
