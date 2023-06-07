import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { In } from 'typeorm';
import { BookRepository } from '../../repositories/book.repository';
import { User } from '../../../auth/entities/user.entity';
import {
  CreateBookReqDto,
  DeleteListBookReqDto,
  GetListBooksReqDto,
  UpdateBookReqDto,
} from '../../dtos/book.req.dto';
import {
  BadRequestExc,
  ConflictExc,
} from '../../../common/exceptions/custom.exception';
import { TypeORMQueryResult } from '../../../common/dtos/sql-query-result.dto';
import { EmailConfirmationService } from '../../../emailConfirmation/emailConfirmation.service';
import { BookStatus } from '../../enums/book.enum';

@Injectable()
export class BookCustomerService {
  constructor(
    private bookRepo: BookRepository,
    private emailConfirmation: EmailConfirmationService,
  ) {}

  async createBook(bookDto: CreateBookReqDto) {
    const existBook = await this.bookRepo.findOneBy({
      userId: bookDto.userId,
      email: bookDto.email,
    });
    if (!existBook) {
      const book = this.bookRepo.create({
        userId: bookDto.userId,
        roomId: bookDto.roomId,
        firstName: bookDto.firstName,
        lastName: bookDto.lastName,
        email: bookDto.email,
        phoneNumber: bookDto.phoneNumber,
        dateMeet: bookDto.dateMeet,
      });
      await this.bookRepo.save(book);
      await this.emailConfirmation.sendVerificationBookingDate(book.email);
      return book;
    }
    const book = this.bookRepo.create({
      ...existBook,
      firstName: bookDto.firstName,
      lastName: bookDto.lastName,
      email: bookDto.email,
      phoneNumber: bookDto.phoneNumber,
      status: BookStatus.PROCESSING,
      roomId: bookDto.roomId,
      dateMeet: bookDto.dateMeet,
    });
    await this.bookRepo.save(book);
    // if (existBook.status === BookStatus.PROCESSING) {
    //   await this.emailConfirmation.sendVerificationBookingDate(book.email);
    // }
    await this.emailConfirmation.sendVerificationBookingDate(book.email);
    return book;
  }
  // async findOne(user: User, id: number) {
  //   const book = await this.bookRepo.findOneOrThrowNotFoundExc({
  //     where: { id, userId: user.id },
  //   });
  //   return book;
  // }

  // async getListBook(user: User, dto: GetListBooksReqDto) {
  //   const { limit, page } = dto;
  //   const queryBuilder = this.bookRepo
  //     .createQueryBuilder('book')
  //     .andWhere('book.userId = :userId', {
  //       userId: user.id,
  //     });
  //   const { items, meta } = await paginate(queryBuilder, {
  //     limit,
  //     page,
  //   });

  //   return new Pagination(items, meta);
  // }

  // async updateBook(user: User, id: number, bookDto: UpdateBookReqDto) {
  //   const existBook = await this.bookRepo.findOneBy({
  //     id: id,
  //     user: { id: user.id },
  //   });
  //   if (!existBook) {
  //     throw new ConflictExc('common');
  //   }
  //   const book = this.bookRepo.create({
  //     ...existBook,
  //     name: bookDto.name,
  //     slug: bookDto.slug,
  //     description: bookDto.description,
  //   });
  //   await this.bookRepo.save(book);
  //   return book;
  // }

  async deleteBook(user: User, id: number) {
    const product = await this.bookRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
    });
    if (product) {
      await this.bookRepo.softDelete(id);
    }
  }

  async deleteListBook(
    dto: DeleteListBookReqDto,
    user: User,
  ): Promise<TypeORMQueryResult> {
    const { ids } = dto;

    const result = await this.bookRepo.softDelete({
      id: In(ids),
      userId: user.id,
    });

    if (result.affected !== ids.length) throw new BadRequestExc('common');

    return result;
  }
}
