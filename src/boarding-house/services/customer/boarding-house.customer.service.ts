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
import { BoardingHouseCommonService } from '../common/boardingHouse.common.service';

@Injectable()
export class BoardingHouseCustomerService {
  constructor(
    private boardingHouseRepo: BoardingHouseRepository,
    private boardingHouseAddressRepo: BoardingHouseAddressRepository,
    private boardingHouseRuleRepo: BoardingHouseRuleRepository,
    private boardingHouseRentDepositRepo: BoardingHouseRentDepositRepository,
    private boardingHouseCommonService: BoardingHouseCommonService,
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
    const { limit, page, startPrice, endPrice, province, ward, district } = dto;
    let { searchText } = dto;
    const queryBuilder = this.boardingHouseRepo
      .createQueryBuilder('boardingHouse')
      .leftJoinAndSelect(
        'boardingHouse.boardingHouseAddress',
        'boardingHouseAddress',
      )
      .leftJoinAndSelect('boardingHouse.floors', 'floor')
      .leftJoinAndSelect('floor.rooms', 'room');

    if (searchText) {
      searchText = `%${searchText}%`;
      queryBuilder.where('boardingHouse.name ILIKE :searchText', {
        searchText,
      });
    }

    if (province) {
      queryBuilder.where('boardingHouseAddress.province ILIKE :province', {
        province,
      });
    }

    if (ward) {
      searchText = `%${searchText}%`;
      queryBuilder.where('boardingHouseAddress.ward ILIKE :ward', { ward });
    }

    if (district) {
      searchText = `%${searchText}%`;
      queryBuilder.where('boardingHouseAddress.district ILIKE :district', {
        district,
      });
    }
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    let boardingHouses = await Promise.all(
      items.map(async (item) => {
        const boardingHouse =
          await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
            where: { id: item.id },
            relations: {
              floors: { rooms: { roomImages: { localFile: true } } },
              user: { lessor: { avatar: true } },
              boardingHouseRentDeposits: true,
              boardingHouseToTags: { tag: true },
              boardingHouseRules: true,
              boardingHouseAddress: true,
              commentToBoardingHouses: { comment: true },
            },
          });
        const priceRange =
          await this.boardingHouseCommonService.getBoardingHousePriceRange(
            item,
          );
        return BoardingHouseResDto.forCustomer({
          dataBoardingHouse: boardingHouse,
          priceRange,
        });
      }),
    );
    if (startPrice && endPrice) {
      boardingHouses = boardingHouses.filter(
        (item) => item.price >= startPrice && item.price <= endPrice,
      );
    }
    return new Pagination(boardingHouses, meta);
    // return tests;
  }
}
