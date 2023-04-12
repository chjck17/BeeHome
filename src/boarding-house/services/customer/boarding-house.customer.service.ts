import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { In } from 'typeorm';
import { BoardingHouseRepository } from '../../repositories/boarding-house.repository';
import {
  CreateBoardingHouseReqDto,
  DeleteListReqDto,
  GetListBoardingHousesReqDto,
  UpdateBoardingHouseReqDto,
} from '../../dtos/boarding-house.req.dto';
import { User } from '../../../auth/entities/user.entity';
import {
  BadRequestExc,
  ConflictExc,
} from '../../../common/exceptions/custom.exception';
import { TypeORMQueryResult } from '../../../common/dtos/sql-query-result.dto';
import { BoardingHouseAddressRepository } from '../../repositories/boarding-house-address.repository';
import { BoardingHouseRuleRepository } from '../../repositories/boarding-house-rule.repository';
import { BoardingHouseRentDepositRepository } from '../../repositories/boarding-house-rent-deposits.repository';
import { FloorRepository } from '../../../floor/repositories/floor.repository';
import { BoardingHouseResDto } from '../../dtos/res/boarding-house.res.dto';

@Injectable()
export class BoardingHouseCustomerService {
  constructor(
    private boardingHouseRepo: BoardingHouseRepository,
    private boardingHouseAddressRepo: BoardingHouseAddressRepository,
    private boardingHouseRuleRepo: BoardingHouseRuleRepository,
    private boardingHouseRentDepositRepo: BoardingHouseRentDepositRepository,
    private floorRepo: FloorRepository,
  ) {}

  async findOne(id: number) {
    const boardingHouse =
      await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
        where: { id },
      });
    return boardingHouse;
  }

  async getListBoardingHouse(dto: GetListBoardingHousesReqDto) {
    const { limit, page } = dto;
    const queryBuilder =
      this.boardingHouseRepo.createQueryBuilder('boardingHouse');
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });
    const boardingHouses = await Promise.all(
      items.map(async (item) => {
        const boardingHouse =
          await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
            where: { id: item.id },
            relations: {
              floors: { rooms: { roomImages: { localFile: true } } },
            },
          });
        return BoardingHouseResDto.forCustomer(boardingHouse);
      }),
    );
    return new Pagination(boardingHouses, meta);
  }
}
