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
import { EmailConfirmationService } from '../emailConfirmation/emailConfirmation.service';
import { JwtService } from '@nestjs/jwt';
import EmailService from '../email/email.service';
import { UserRepository } from '../auth/repositories/user.repository';
import { CustomerRepository } from '../auth/repositories/customer.repository';
import { LessorRepository } from '../auth/repositories/lessor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookDisable])],
  controllers: [
    BookLessorController,
    BookCustomerController,
    BookDisableLessorController,
  ],
  providers: [
    LessorRepository,
    CustomerRepository,
    UserRepository,
    JwtService,
    EmailService,
    BookRepository,
    BookLessorService,
    BookCustomerService,
    BookDisableLessorService,
    BookDisableRepository,
    EmailConfirmationService,
  ],
})
export class BookModule {}
