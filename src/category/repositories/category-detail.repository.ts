import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Category } from '../entities/category.entity';
import { CategoryDetail } from '../entities/category-detail.entity';

@Injectable()
export class CategoryDetailRepository extends BaseRepository<CategoryDetail> {
  constructor(dataSource: DataSource) {
    super(CategoryDetail, dataSource);
  }
}
