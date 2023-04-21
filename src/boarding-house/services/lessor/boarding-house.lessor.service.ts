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

@Injectable()
export class BoardingHouseLessorService {
  constructor(
    private boardingHouseRepo: BoardingHouseRepository,
    private boardingHouseAddressRepo: BoardingHouseAddressRepository,
    private boardingHouseDescriptionRepo: BoardingHouseDescriptionRepository,
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
      houseDescriptions,
      boardingHouseRules,
      address,
      floor,
      electricFee,
      waterFee,
      serviceFee,
      tagIds,
    } = dto;
    const boardingHouse = this.boardingHouseRepo.create({
      userId: user.id,
      name: name,
      type: type,
      status: Status.ACTIVE,
      electricFee,
      waterFee,
      serviceFee,
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

    await Promise.all([
      houseDescriptions.map(async (item) => {
        const boardingHouseDescription =
          this.boardingHouseDescriptionRepo.create({
            boardingHouseId: boardingHouse.id,
            lang: item.lang,
            content: item.content,
          });
        await this.boardingHouseDescriptionRepo.save(boardingHouseDescription);
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
          tagId: Number(item),
        });
        await this.boardingHouseToTagRepo.save(tag);
      }),
    ]);
    return boardingHouse;
    // return dto;
  }
  async findOne(user: User, id: number) {
    const boardingHouse =
      await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
        where: { id, userId: user.id },
        relations: {
          floors: {
            rooms: {
              roomToCategories: true,
              roomToAttributes: true,
              roomImages: true,
            },
          },
          boardingHouseRentDeposits: true,
          boardingHouseToTags: { tag: true },
          boardingHouseRules: true,
          boardingHouseAddress: true,
        },
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
    const boardingHouses = await Promise.all(
      items.map(async (item) => {
        const boardingHouse =
          await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
            where: { id: item.id },
            relations: {
              floors: { rooms: { roomImages: { localFile: true } } },
              boardingHouseRentDeposits: true,
              boardingHouseToTags: { tag: true },
              boardingHouseRules: true,
              boardingHouseAddress: true,
            },
          });
        // return BoardingHouseResDto.forCustomer(boardingHouse);
        return boardingHouse;
      }),
    );
    return new Pagination(boardingHouses, meta);
  }

  async updateBoardingHouse(user: User, dto: UpdateBoardingHouseReqDto) {
    const {
      id,
      name,
      type,
      houseRentDeposits,
      houseDescriptions,
      boardingHouseRules,
      address,
      tagIds,
      status,
      electricFee,
      waterFee,
      serviceFee,
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
      id: id,
      userId: existBoardingHouse.userId,
      name: name,
      type: type,
      status: status,
      electricFee: electricFee,
      waterFee: waterFee,
      serviceFee: serviceFee,
    });

    await this.boardingHouseAddressRepo.save({
      id: address.id,
      boardingHouseId: existBoardingHouse.id,
      address: address.address,
      district: address.district,
      province: address.province,
      ward: address.ward,
    });

    await Promise.all([
      houseRentDeposits.map(async (item) => {
        await this.boardingHouseRentDepositRepo.save({
          id: item.id,
          boardingHouseId: existBoardingHouse.id,
          lang: item.lang,
          content: item.content,
        });
      }),
    ]);

    await Promise.all([
      boardingHouseRules.map(async (item) => {
        const boardingHouseRole = this.boardingHouseRuleRepo.create({
          id: item.id,
          boardingHouseId: existBoardingHouse.id,
          lang: item.lang,
          content: item.content,
        });
        await this.boardingHouseRuleRepo.save(boardingHouseRole);
      }),
    ]);

    await Promise.all([
      houseDescriptions.map(async (item) => {
        const boardingDescription = this.boardingHouseDescriptionRepo.create({
          id: item.id,
          boardingHouseId: existBoardingHouse.id,
          lang: item.lang,
          content: item.content,
        });
        await this.boardingHouseDescriptionRepo.save(boardingDescription);
      }),
    ]);
    await this.saveItem(
      existBoardingHouse.id,
      existBoardingHouse.boardingHouseToTags,
      tagIds,
    );
    return existBoardingHouse;
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

  private async saveItem(
    itemId: number,
    items: BoardingHouseToTag[],
    itemsDto: string[],
  ) {
    const itemIdsToRemove: number[] = [];
    const itemToInsert: BoardingHouseToTag[] = [];
    const itemToUpdate: Partial<BoardingHouseToTag>[] = [];

    for (const itemInDb of items) {
      const dto = itemsDto.find((id) => Number(id) === itemInDb.id);
      if (!dto) {
        itemIdsToRemove.push(itemInDb.id);
      }
    }

    for (const id of itemsDto) {
      const dto = items.find((item) => Number(id) === item.id);
      if (!dto) {
        itemToInsert.push(
          this.boardingHouseToTagRepo.create({
            boardingHouseId: itemId,
            tagId: Number(id),
          }),
        );
      }
    }

    await Promise.all([
      itemIdsToRemove.length &&
        this.boardingHouseToTagRepo.delete(itemIdsToRemove),
    ]);

    if (itemToInsert.length) {
      await this.boardingHouseToTagRepo.insert(itemToInsert);
    }
    // return { itemDetailIdsToRemove, itemDetailsToInsert, itemDetailsToUpdate };
  }
}
