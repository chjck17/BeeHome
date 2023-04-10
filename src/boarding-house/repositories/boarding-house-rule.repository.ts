import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { BoardingHouseRule } from '../entities/boarding-house-rule.entity';

@Injectable()
export class BoardingHouseRuleRepository extends BaseRepository<BoardingHouseRule> {
  constructor(dataSource: DataSource) {
    super(BoardingHouseRule, dataSource);
  }
}
