import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { In } from 'typeorm';
import { TagRepository } from '../repositories/tag.repository';
import { User } from '../../auth/entities/user.entity';
import {
  CreateTagReqDto,
  DeleteListTagReqDto,
  GetListTagsReqDto,
  UpdateTagReqDto,
} from '../dtos/tag.req.dto';
import {
  BadRequestExc,
  ConflictExc,
} from '../../common/exceptions/custom.exception';
import { TypeORMQueryResult } from '../../common/dtos/sql-query-result.dto';

@Injectable()
export class TagLessorService {
  constructor(private tagRepo: TagRepository) {}

  async createTag(user: User, tagDto: CreateTagReqDto) {
    const tag = this.tagRepo.create({
      userId: user.id,
      name: tagDto.name,
      slug: tagDto.slug,
      description: tagDto.description,
    });
    await this.tagRepo.save(tag);
    return tag;
  }
  async findOne(user: User, id: number) {
    const tag = await this.tagRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
    });
    return tag;
  }

  async getListTag(user: User, dto: GetListTagsReqDto) {
    const { limit, page } = dto;
    const queryBuilder = this.tagRepo
      .createQueryBuilder('tag')
      .andWhere('tag.userId = :userId', {
        userId: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    return new Pagination(items, meta);
  }

  async updateTag(user: User, id: number, tagDto: UpdateTagReqDto) {
    const existTag = await this.tagRepo.findOneBy({
      id: id,
      user: { id: user.id },
    });
    if (!existTag) {
      throw new ConflictExc('common');
    }
    const tag = this.tagRepo.create({
      ...existTag,
      name: tagDto.name,
      slug: tagDto.slug,
      description: tagDto.description,
    });
    await this.tagRepo.save(tag);
    return tag;
  }

  async deleteTag(user: User, id: number) {
    const product = await this.tagRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
    });
    if (product) {
      await this.tagRepo.softDelete(id);
    }
  }

  async deleteListTag(
    dto: DeleteListTagReqDto,
    user: User,
  ): Promise<TypeORMQueryResult> {
    const { ids } = dto;

    const result = await this.tagRepo.softDelete({
      id: In(ids),
      userId: user.id,
    });

    if (result.affected !== ids.length) throw new BadRequestExc('common');

    return result;
  }
}
