import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookRepository } from './repositories/book.repository';

import { Book } from './entities/book.entity';
import { BookLessorService } from './services/lessor/book.lessor.service';
import { BookLessorController } from './controllers/lessor/book.lessor.controller';
import { BookCustomerController } from './controllers/customer/book.customer.controller';
import { BookCustomerService } from './services/customer/book.service';
import { BookDisableLessorController } from './controllers/lessor/book-disable.controller';
import { BookDisableLessorService } from './services/lessor/book-disable.lessor.service';
import { BookDisable } from './entities/book-disable.entity';
import { BookDisableRepository } from './repositories/book-disable.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookDisable])],
  controllers: [
    BookLessorController,
    BookCustomerController,
    BookDisableLessorController,
  ],
  providers: [
    BookRepository,
    BookLessorService,
    BookCustomerService,
    BookDisableLessorService,
    BookDisableRepository,
  ],
})
export class BookModule {}
