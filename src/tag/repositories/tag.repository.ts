import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagRepository extends BaseRepository<Tag> {
  constructor(dataSource: DataSource) {
    super(Tag, dataSource);
  }
}
