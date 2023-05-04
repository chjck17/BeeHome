import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { In } from 'typeorm';
import { CommentRepository } from '../../repositories/comment.repository';
import { User } from '../../../auth/entities/user.entity';
import {
  CreateCommentReqDto,
  DeleteListCommentReqDto,
  GetListCommentsReqDto,
  UpdateCommentReqDto,
} from '../../dtos/comment.req.dto';
import {
  BadRequestExc,
  ConflictExc,
} from '../../../common/exceptions/custom.exception';
import { TypeORMQueryResult } from '../../../common/dtos/sql-query-result.dto';
import { CommentToBoardingHouseRepository } from '../../repositories/commentToBoardingHouse.repository';
import { BoardingHouseRepository } from '../../../boarding-house/repositories/boarding-house.repository';

@Injectable()
export class CommentCustomerService {
  constructor(
    private commentRepo: CommentRepository,
    private boardingHouseRepo: BoardingHouseRepository,
    private commentToBoardingHouseRepo: CommentToBoardingHouseRepository,
  ) {}

  async createComment(user: User, dto: CreateCommentReqDto) {
    const comment = this.commentRepo.create({
      userId: user.id,
      content: dto.content,
      star: dto.star,
    });

    await this.commentRepo.save(comment);
    const commentToBoardingHouse = this.commentToBoardingHouseRepo.create({
      boardingHouseId: dto.boardingHouseId,
      commentId: comment.id,
    });
    await this.commentToBoardingHouseRepo.save(commentToBoardingHouse);

    return comment;
  }
  async findOne(id: number) {
    const comment = await this.commentRepo.findOneOrThrowNotFoundExc({
      where: { id },
    });
    return comment;
  }

  async getListComment(id: number) {
    const comment = await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
      where: { id },
      relations: {
        commentToBoardingHouses: { comment: { user: { customer: true } } },
      },
      order: { commentToBoardingHouses: { comment: { createdAt: 'DESC' } } },
    });
    return comment;
  }

  async updateComment(user: User, id: number, dto: UpdateCommentReqDto) {
    const existComment = await this.commentRepo.findOneBy({
      id: id,
      user: { id: user.id },
    });
    if (!existComment) {
      throw new ConflictExc('common');
    }
    const comment = this.commentRepo.create({
      ...existComment,
      content: dto.content,
      star: dto.star,
    });
    await this.commentRepo.save(comment);
    return comment;
  }

  async deleteComment(user: User, id: number) {
    const comment = await this.commentRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
    });
    if (comment) {
      await this.commentRepo.softDelete(id);
    }
  }

  async deleteListComment(
    dto: DeleteListCommentReqDto,
    user: User,
  ): Promise<TypeORMQueryResult> {
    const { ids } = dto;

    const result = await this.commentRepo.softDelete({
      id: In(ids),
      userId: user.id,
    });

    if (result.affected !== ids.length) throw new BadRequestExc('common');

    return result;
  }
}
