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
import { BoardingHouseToTagRuleRepository } from '../../repositories/boarding-house-to-tag.repository';
import { Status } from '../../../common/enums/status.enum';
import { BoardingHouseResDto } from '../../dtos/res/boarding-house.res.dto';
import { BoardingHouseToTag } from '../../entities/boarding-house-to-tag.entity';
import { BoardingHouseDescriptionRepository } from '../../repositories/boarding-house-description.repository';
import { BoardingHouseCommonService } from '../common/boardingHouse.common.service';
import { BoardingHouseImageRepository } from '../../repositories/boarding-house-img.repository';
import { BoardingHouseImage } from '../../entities/boarding-house-img.entity';
import { UpdateBoardingHouseStatusReqDto } from 'src/boarding-house/dtos/admin/boarding-house.admin.req.dto';

@Injectable()
export class BoardingHouseAdminService {
  constructor(
    private boardingHouseRepo: BoardingHouseRepository,
    private boardingHouseAddressRepo: BoardingHouseAddressRepository,
    private boardingHouseDescriptionRepo: BoardingHouseDescriptionRepository,
    private boardingHouseRuleRepo: BoardingHouseRuleRepository,
    private boardingHouseRentDepositRepo: BoardingHouseRentDepositRepository,
    private boardingHouseToTagRepo: BoardingHouseToTagRuleRepository,
    private boardingHouseCommonService: BoardingHouseCommonService,
    private boardingHouseImageRepo: BoardingHouseImageRepository,
    private floorRepo: FloorRepository,
  ) {}

  async findOne(id: number) {
    const boardingHouse =
      await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
        where: { id },
        relations: {
          floors: {
            rooms: {
              roomToAttributes: true,
              roomImages: true,
            },
          },
          boardingHouseRentDeposits: true,
          boardingHouseRules: true,
          boardingHouseAddress: true,
          boardingHouseDescriptions: true,
        },
      });
    return boardingHouse;
  }

  async getListBoardingHouseByFilter(dto: GetListBoardingHousesReqDto) {
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
    // if (startPrice)
    //   queryBuilder.where('game.startDate > :startDate', { startPrice });
    // if (endPrice) queryBuilder.where('game.endDate < :endDate', { endPrice });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    // const tests = Promise.all(
    //   items.map((item) => {
    //     const test = this.boardingHouseCommonService.getBoardingHousePriceRange(item);
    //     return test;
    //   }),
    // );
    const boardingHouses = await Promise.all(
      items.map(async (item) => {
        const boardingHouse =
          await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
            where: { id: item.id },
            relations: {
              floors: { rooms: { roomImages: { localFile: true } } },
              boardingHouseRentDeposits: true,
              boardingHouseRules: true,
              boardingHouseAddress: true,
            },
          });
        // return BoardingHouseResDto.forCustomer(boardingHouse);
        return boardingHouse;
      }),
    );
    return new Pagination(boardingHouses, meta);
    // return tests;
  }
  async getListBoardingHouse(dto: GetListBoardingHousesReqDto) {
    const { limit, page, startPrice, endPrice, province, ward, district } = dto;
    const queryBuilder = this.boardingHouseRepo
      .createQueryBuilder('boardingHouse')
      .leftJoinAndSelect(
        'boardingHouse.boardingHouseAddress',
        'boardingHouseAddress',
      )
      .leftJoinAndSelect('boardingHouse.floors', 'floor')
      .leftJoinAndSelect('floor.rooms', 'room');

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
              boardingHouseRentDeposits: true,
              boardingHouseRules: true,
              boardingHouseAddress: true,
              boardingHouseDescriptions: true,
            },
          });
        return boardingHouse;
      }),
    );
    return new Pagination(boardingHouses, meta);
  }
  async updateBoardingHouse(dto: UpdateBoardingHouseStatusReqDto) {
    const { id, adminStatus } = dto;
    const existBoardingHouse = await this.boardingHouseRepo.findOne({
      where: { id: id },
    });
    if (!existBoardingHouse) {
      throw new ConflictExc('common');
    }

    await this.boardingHouseRepo.save({
      id: id,
      adminStatus: adminStatus,
    });
    return existBoardingHouse;
  }
}
