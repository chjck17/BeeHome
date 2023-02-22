import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { UserToGroupPolicy } from '../entities/user-to-group-policies.entity';

@Injectable()
export class UserToGroupPolicyRepository extends BaseRepository<UserToGroupPolicy> {
  constructor(dataSource: DataSource) {
    super(UserToGroupPolicy, dataSource);
  }
}
