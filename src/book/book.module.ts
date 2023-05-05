import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookRepository } from './repositories/book.repository';

import { Book } from './entities/book.entity';
import { BookLessorController } from './controllers/customer/book.customer.controller';
import { BookLessorService } from './services/customer/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookLessorController],
  providers: [BookRepository, BookLessorService],
})
export class BookModule {}
