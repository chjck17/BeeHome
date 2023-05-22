import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmailService from 'src/email/email.service';
import { EmailConfirmationController } from './emailConfirmation.controller';
import { EmailConfirmationService } from './emailConfirmation.service';
import { LessorRepository } from '../auth/repositories/lessor.repository';
import { CustomerRepository } from '../auth/repositories/customer.repository';
import { Lessor } from '../auth/entities/lessor.entity';
import { Customer } from '../auth/entities/customer.entity';
import { User } from '../auth/entities/user.entity';
import { UserRepository } from '../auth/repositories/user.repository';
import { BookRepository } from '../book/repositories/book.repository';
import { Book } from '../book/entities/book.entity';
@Module({
  imports: [
    ConfigModule,
    EmailModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Lessor, Customer, User, Book]),
  ],
  providers: [
    EmailConfirmationService,
    EmailService,
    LessorRepository,
    CustomerRepository,
    UserRepository,
    BookRepository,
  ],
  exports: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
})
export class EmailConfirmationModule {}
