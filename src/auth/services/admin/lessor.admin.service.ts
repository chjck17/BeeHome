import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { IsNull } from 'typeorm';
import { DeleteMultipleByIdNumberReqDto } from '../../../common/dtos/delete-multiple.dto';
import { NotFoundExc } from '../../../common/exceptions/custom.exception';
import {
  ListLessorAdminReqDto,
  UpdateStatusLessorAdminReqDto,
} from '../../dtos/admin/req/lessor.admin.req.dto';
import { LessorResDto } from '../../dtos/common/res/lessor.res.dto';
import { LessorRepository } from '../../repositories/lessor.repository';
import { UserRepository } from '../../repositories/user.repository';
import { UserType } from '../../enums/user.enum';
import { LessorStatus } from '../../enums/lessor.enum';

@Injectable()
export class LessorAdminService {
  constructor(
    private lessorRepo: LessorRepository,
    private userRepo: UserRepository,
  ) {}

  async getList(dto: ListLessorAdminReqDto) {
    const { rank, status, limit, page } = dto;
    let { searchText } = dto;

    const queryBuilder = this.lessorRepo
      .createQueryBuilder('lessor')
      .leftJoinAndSelect('lessor.avatar', 'avatar');

    if (searchText) {
      searchText = `%${searchText}%`;
      queryBuilder.andWhere('lessor.email ILIKE :searchText', {
        searchText,
      });
    }
    if (status) queryBuilder.andWhere('lessor.status = :status', { status });
    if (rank) queryBuilder.andWhere('lessor.rank = :rank', { rank });

    const { items, meta } = await paginate(queryBuilder, { limit, page });

    const lessors = items.map((item) => LessorResDto.forAdmin(item));

    return new Pagination(lessors, meta);
  }

  async getDetail(id: number) {
    const lessor = await this.lessorRepo.findOneOrThrowNotFoundExc({
      where: { id: 1 },
      // relations: { avatar: true },
    });

    const user = await this.userRepo.findOne({
      where: {
        id: 2,
        type: UserType.LESSOR,
        lessor: { status: LessorStatus.APPROVED },
      },
      relations: { lessor: true },
    });
    // return LessorResDto.forAdmin(lessor);
    return user;
  }

  async updateStatus(dto: UpdateStatusLessorAdminReqDto) {
    const { lessorId, status } = dto;

    const { affected } = await this.lessorRepo.update(
      { id: lessorId, deletedAt: IsNull() },
      { status },
    );

    if (affected < 1) throw new NotFoundExc('Lessor not found');
  }

  async deleteList(dto: DeleteMultipleByIdNumberReqDto) {
    const { ids } = dto;
    return this.lessorRepo.softDelete(ids);
  }

  async deleteSingle(id: number) {
    const lessor = await this.lessorRepo.findOneByOrThrowNotFoundExc({
      id,
    });

    return this.lessorRepo.softRemove(lessor);
  }
}
