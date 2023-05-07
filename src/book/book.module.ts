import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookRepository } from './repositories/book.repository';

import { Book } from './entities/book.entity';
import { BookLessorService } from './services/lessor/book.lessor.service';
import { BookLessorController } from './controllers/lessor/book.lessor.controller';
import { BookCustomerController } from './controllers/customer/book.customer.controller';
import { BookCustomerService } from './services/customer/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookLessorController, BookCustomerController],
  providers: [BookRepository, BookLessorService, BookCustomerService],
})
export class BookModule {}
