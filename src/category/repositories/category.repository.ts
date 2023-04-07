import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(dataSource: DataSource) {
    super(Category, dataSource);
  }
}
