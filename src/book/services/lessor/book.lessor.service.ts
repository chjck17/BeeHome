import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { In, IsNull } from 'typeorm';
import { BookRepository } from '../../repositories/book.repository';
import { User } from '../../../auth/entities/user.entity';
import {
  DeleteListBookReqDto,
  GetListBooksReqDto,
} from '../../dtos/book.req.dto';
import {
  BadRequestExc,
  NotFoundExc,
} from '../../../common/exceptions/custom.exception';
import { TypeORMQueryResult } from '../../../common/dtos/sql-query-result.dto';
import { UpdateStatusLessorBookReqDto } from '../../dtos/lessor/book-status.lessor.req.dto';

@Injectable()
export class BookLessorService {
  constructor(private bookRepo: BookRepository) {}
  async getListBook(user: User, dto: GetListBooksReqDto) {
    const { limit, page } = dto;
    const queryBuilder = this.bookRepo
      .createQueryBuilder('book')
      .andWhere('book.userId = :userId', {
        userId: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    return new Pagination(items, meta);
  }
  async updateStatus(user: User, dto: UpdateStatusLessorBookReqDto) {
    const { status, bookId } = dto;

    const { affected } = await this.bookRepo.update(
      { id: bookId, deletedAt: IsNull() },
      { status },
    );

    if (affected < 1) throw new NotFoundExc('Lessor not found');
  }

  async findOne(user: User, id: number) {
    const book = await this.bookRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
      relations: { room: true },
    });
    return book;
  }

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
