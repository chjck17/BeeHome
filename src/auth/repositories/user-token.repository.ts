import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { UserToken } from '../entities/user-token.entity';

@Injectable()
export class UserTokenRepository extends BaseRepository<UserToken> {
  constructor(dataSource: DataSource) {
    super(UserToken, dataSource);
  }
}
