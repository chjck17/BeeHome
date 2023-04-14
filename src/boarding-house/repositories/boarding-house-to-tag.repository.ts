import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { BoardingHouseRule } from '../entities/boarding-house-rule.entity';
import { BoardingHouseToTag } from '../entities/boarding-house-to-tag.entity';

@Injectable()
export class BoardingHouseToTagRuleRepository extends BaseRepository<BoardingHouseToTag> {
  constructor(dataSource: DataSource) {
    super(BoardingHouseToTag, dataSource);
  }
}
