import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookRepository extends BaseRepository<Book> {
  constructor(dataSource: DataSource) {
    super(Book, dataSource);
  }
}
