import { Injectable } from '@nestjs/common';

import { FloorRepository } from '../repositories/floor.repository';
import { GetListFloorsReqDto } from '../dtos/lessor/floor.req.dto';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class FloorLessorService {
  constructor(private floorRepo: FloorRepository) {}
  async findOne(id: number, dto: GetListFloorsReqDto) {
    // const floor = await this.floorRepo.findOneOrThrowNotFoundExc({
    //   where: { id },
    //   relations: {
    //     rooms: {
    //       roomImages: true,
    //       roomToAttributes: true,
    //       roomToCategories: true,
    //     },
    //   },
    // });

    const { limit, page } = dto;
    const queryBuilder = this.floorRepo
      .createQueryBuilder('floor')
      .leftJoinAndSelect('floor.rooms', 'room')
      .andWhere('floor.id = :id', {
        id: id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });
    return new Pagination(items, meta);
  }
}
