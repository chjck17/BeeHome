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

@Injectable()
export class BoardingHouseLessorService {
  constructor(
    private boardingHouseRepo: BoardingHouseRepository,
    private boardingHouseAddressRepo: BoardingHouseAddressRepository,
    private boardingHouseRuleRepo: BoardingHouseRuleRepository,
    private boardingHouseRentDepositRepo: BoardingHouseRentDepositRepository,
  ) {}

  async createBoardingHouse(user: User, dto: CreateBoardingHouseReqDto) {
    const {
      name,
      status,
      type,
      houseRentDeposits,
      boardingHouseRules,
      address,
    } = dto;
    const boardingHouse = this.boardingHouseRepo.create({
      userId: user.id,
      name: name,
      type: type,
      status: status,
    });
    await this.boardingHouseRepo.save(boardingHouse);

    const boardingHouseAddress = this.boardingHouseAddressRepo.create({
      boardingHouseId: boardingHouse.id,
      address: address.address,
      district: address.district,
      province: address.province,
      ward: address.ward,
    });
    await this.boardingHouseAddressRepo.save(boardingHouseAddress);

    await Promise.all([
      houseRentDeposits.map(async (item) => {
        const boardingHouseRentDeposit =
          this.boardingHouseRentDepositRepo.create({
            boardingHouseId: boardingHouse.id,
            lang: item.lang,
            content: item.content,
          });
        await this.boardingHouseRentDepositRepo.save(boardingHouseRentDeposit);
      }),
    ]);

    await Promise.all([
      boardingHouseRules.map(async (item) => {
        const boardingHouseRole = this.boardingHouseRuleRepo.create({
          boardingHouseId: boardingHouse.id,
          lang: item.lang,
          content: item.content,
        });
        await this.boardingHouseRuleRepo.save(boardingHouseRole);
      }),
    ]);
    return boardingHouse;
  }
  async findOne(user: User, id: number) {
    const boardingHouse =
      await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
        where: { id, userId: user.id },
      });
    return boardingHouse;
  }

  async getListBoardingHouse(user: User, dto: GetListBoardingHousesReqDto) {
    const { limit, page } = dto;
    const queryBuilder = this.boardingHouseRepo
      .createQueryBuilder('boardingHouse')
      .andWhere('boardingHouse.userId = :userId', {
        userId: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    return new Pagination(items, meta);
  }

  async updateBoardingHouse(
    user: User,
    id: number,
    dto: UpdateBoardingHouseReqDto,
  ) {
    const existBoardingHouse = await this.boardingHouseRepo.findOneBy({
      id: id,
      user: { id: user.id },
    });
    if (!existBoardingHouse) {
      throw new ConflictExc('common');
    }
    const boardingHouse = this.boardingHouseRepo.create({
      ...existBoardingHouse,
      name: dto.name,
      type: dto.type,
      status: dto.status,
    });
    await this.boardingHouseRepo.save(boardingHouse);
    return boardingHouse;
  }

  async deleteBoardingHouse(user: User, id: number) {
    const product = await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
    });
    if (product) {
      await this.boardingHouseRepo.softDelete(id);
    }
  }

  async deleteListBoardingHouse(
    dto: DeleteListReqDto,
    user: User,
  ): Promise<TypeORMQueryResult> {
    const { ids } = dto;

    const result = await this.boardingHouseRepo.softDelete({
      id: In(ids),
      userId: user.id,
    });

    if (result.affected !== ids.length) throw new BadRequestExc('common');

    return result;
  }
}
