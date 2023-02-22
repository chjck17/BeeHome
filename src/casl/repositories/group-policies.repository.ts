import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { GroupPolicy } from '../entities/group-policies.entity';

@Injectable()
export class GroupPolicyRepository extends BaseRepository<GroupPolicy> {
  constructor(dataSource: DataSource) {
    super(GroupPolicy, dataSource);
  }
}
