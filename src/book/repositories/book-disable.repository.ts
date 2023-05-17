import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Book } from '../entities/book.entity';
import { BookDisable } from '../entities/book-disable.entity';

@Injectable()
export class BookDisableRepository extends BaseRepository<BookDisable> {
  constructor(dataSource: DataSource) {
    super(BookDisable, dataSource);
  }
}
