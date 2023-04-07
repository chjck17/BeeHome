import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Category } from '../entities/category.entity';
import { CategoryTypeDetail } from '../entities/category-type-detail.entity';

@Injectable()
export class CategoryTypeDetailRepository extends BaseRepository<CategoryTypeDetail> {
  constructor(dataSource: DataSource) {
    super(CategoryTypeDetail, dataSource);
  }
}
