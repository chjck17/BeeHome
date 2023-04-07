import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { CategoryType } from '../entities/category-type.entity';

@Injectable()
export class CategoryTypeRepository extends BaseRepository<CategoryType> {
  constructor(dataSource: DataSource) {
    super(CategoryType, dataSource);
  }
}
