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

@Injectable()
export class BoardingHouseLessorService {
  constructor(
    private boardingHouseRepo: BoardingHouseRepository,
    private boardingHouseAddressRepo: BoardingHouseAddressRepository,
    private boardingHouseRuleRepo: BoardingHouseRuleRepository,
    private boardingHouseRentDepositRepo: BoardingHouseRentDepositRepository,
    private boardingHouseToTagRepo: BoardingHouseToTagRuleRepository,

    private floorRepo: FloorRepository,
  ) {}

  async createBoardingHouse(user: User, dto: CreateBoardingHouseReqDto) {
    const {
      name,
      type,
      houseRentDeposits,
      boardingHouseRules,
      address,
      floor,
      tagIds,
    } = dto;
    const boardingHouse = this.boardingHouseRepo.create({
      userId: user.id,
      name: name,
      type: type,
      status: Status.ACTIVE,
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

    for (let i = 1; i <= floor; i++) {
      const floor = this.floorRepo.create({
        boardingHouseId: boardingHouse.id,
        floorNumber: i,
      });
      await this.floorRepo.save(floor);
    }

    await Promise.all([
      tagIds.map(async (item) => {
        const tag = this.boardingHouseToTagRepo.create({
          boardingHouseId: boardingHouse.id,
          tagId: item,
        });
        await this.boardingHouseToTagRepo.save(tag);
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
    const {
      name,
      type,
      houseRentDeposits,
      boardingHouseRules,
      address,
      tagIds,
      status,
    } = dto;
    const existBoardingHouse = await this.boardingHouseRepo.findOne({
      where: { id: id, user: { id: user.id } },
      relations: {
        boardingHouseRentDeposits: true,
        boardingHouseToTags: { tag: true },
        boardingHouseRules: true,
        boardingHouseAddress: true,
      },
    });
    if (!existBoardingHouse) {
      throw new ConflictExc('common');
    }

    await this.boardingHouseRepo.save({
      ...existBoardingHouse,
      name: name,
      type: type,
      status: status,
    });

    await this.boardingHouseAddressRepo.save({
      boardingHouseId: existBoardingHouse.id,
      address: address.address,
      district: address.district,
      province: address.province,
      ward: address.ward,
    });
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

    await Promise.all([
      tagIds.map(async (item) => {
        const tag = this.boardingHouseToTagRepo.create({
          boardingHouseId: boardingHouse.id,
          tagId: item,
        });
        await this.boardingHouseToTagRepo.save(tag);
      }),
    ]);

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
