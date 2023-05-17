import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { In, IsNull } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import {
  DeleteListBookReqDto,
  GetListBooksReqDto,
} from '../../dtos/book.req.dto';
import { BadRequestExc } from '../../../common/exceptions/custom.exception';
import { TypeORMQueryResult } from '../../../common/dtos/sql-query-result.dto';
import { BookDisableRepository } from '../../repositories/book-disable.repository';
import { CreateBookDisableReqDto } from '../../dtos/lessor/book-disable.lessor.req.dto';

@Injectable()
export class BookDisableLessorService {
  constructor(private bookDisableRepo: BookDisableRepository) {}

  async createBookDisable(bookDto: CreateBookDisableReqDto, user: User) {
    const book = this.bookDisableRepo.create({
      userId: user.id,
      dateDisable: bookDto.dateDisable,
    });
    await this.bookDisableRepo.save(book);
    return book;
  }

  async getListBookDisable(user: User, dto: GetListBooksReqDto) {
    const { limit, page } = dto;
    const queryBuilder = this.bookDisableRepo
      .createQueryBuilder('bookDisable')
      .andWhere('bookDisable.userId = :userId', {
        userId: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    return new Pagination(items, meta);
  }

  async deleteBook(user: User, id: number) {
    const product = await this.bookDisableRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
    });
    if (product) {
      await this.bookDisableRepo.softDelete(id);
    }
  }

  async deleteListBook(
    dto: DeleteListBookReqDto,
    user: User,
  ): Promise<TypeORMQueryResult> {
    const { ids } = dto;

    const result = await this.bookDisableRepo.softDelete({
      id: In(ids),
      userId: user.id,
    });

    if (result.affected !== ids.length) throw new BadRequestExc('common');

    return result;
  }
}
