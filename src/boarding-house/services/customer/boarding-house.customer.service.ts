import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { BoardingHouseRepository } from '../../repositories/boarding-house.repository';
import {
  GetListBoardingHousesByStarCustomerReqDto,
  GetListBoardingHousesCustomerReqDto,
} from '../../dtos/boarding-house.req.dto';
import { BoardingHouseResDto } from '../../dtos/res/boarding-house.res.dto';
import { BoardingHouseCommonService } from '../common/boardingHouse.common.service';
import { addCommentCustomerReqDto } from '../../dtos/customer/customer.req.dto';
import { User } from '../../../auth/entities/user.entity';
import { CommentRepository } from '../../../comment/repositories/comment.repository';
import { CommentToBoardingHouseRepository } from '../../../comment/repositories/commentToBoardingHouse.repository';

@Injectable()
export class BoardingHouseCustomerService {
  constructor(
    private boardingHouseRepo: BoardingHouseRepository,

    private boardingHouseCommonService: BoardingHouseCommonService,
  ) {}

  async findOne(id: number) {
    const boardingHouse =
      await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
        where: { id },
        relations: {
          floors: {
            rooms: {
              // roomToCategories: true,
              roomToAttributes: {
                roomAttributeTerm: { roomAttributeTermDetails: true },
              },
              roomImages: { localFile: true },
            },
          },
          commentToBoardingHouses: { comment: { user: { customer: true } } },
          boardingHouseRentDeposits: true,
          boardingHouseRules: true,
          boardingHouseAddress: true,
          boardingHouseDescriptions: true,
        },
      });
    return boardingHouse;
  }

  async getListBoardingHouse(dto: GetListBoardingHousesCustomerReqDto) {
    const {
      limit,
      page,
      startPrice,
      endPrice,
      province,
      ward,
      district,
      lang,
    } = dto;
    let { searchText } = dto;
    const queryBuilder = this.boardingHouseRepo
      .createQueryBuilder('boardingHouse')
      .leftJoinAndSelect(
        'boardingHouse.boardingHouseAddress',
        'boardingHouseAddress',
      );
    // .leftJoinAndSelect('boardingHouse.floors', 'floor')
    // .leftJoinAndSelect('floor.rooms', 'room');

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
            where: {
              id: item.id,
              boardingHouseRentDeposits: { lang: lang },
              boardingHouseRules: { lang: lang },
              boardingHouseDescriptions: { lang: lang },
            },
            relations: {
              floors: { rooms: { roomImages: { localFile: true } } },
              user: { lessor: { avatar: true } },
              boardingHouseRentDeposits: true,
              boardingHouseDescriptions: true,
              // boardingHouseToTags: { tag: true },
              boardingHouseRules: true,
              boardingHouseAddress: true,
              commentToBoardingHouses: {
                comment: { user: { customer: true } },
              },
              boardingHouseImages: { localFile: true },
            },
          });
        const priceRange =
          await this.boardingHouseCommonService.getBoardingHousePriceRange(
            item,
          );
        const attributes =
          await this.boardingHouseCommonService.getBoardingHouseAttribute(item);

        return BoardingHouseResDto.forCustomer({
          dataBoardingHouse: boardingHouse,
          priceRange,
          attributes,
          star: null,
        });
        // return boardingHouse;
      }),
    );
    if (startPrice && endPrice) {
      boardingHouses = boardingHouses.filter(
        (item) =>
          Number(item.price) >= Number(startPrice) &&
          Number(item.price) <= Number(endPrice),
      );
    }
    return new Pagination(boardingHouses, meta);
  }

  // async comment(dto: addCommentCustomerReqDto, user: User) {
  //   const { boardingHouseId, content, star } = dto;

  //   const comment = this.commentRepo.create({
  //     userId: user.id,
  //     content: content,
  //     star: star,
  //   });
  //   await this.commentRepo.save(comment);

  //   const commentToBoardingHouse = this.commentToBoardingHouseRepo.create({
  //     commentId: comment.id,
  //     boardingHouseId: boardingHouseId,
  //   });
  //   await this.commentToBoardingHouseRepo.save(commentToBoardingHouse);
  // }

  async getListBoardingHouseByStar(
    dto: GetListBoardingHousesByStarCustomerReqDto,
  ) {
    const { limit, page } = dto;
    const queryBuilder = this.boardingHouseRepo
      .createQueryBuilder('boardingHouse')
      .innerJoin(
        'boardingHouse.commentToBoardingHouses',
        'commentToBoardingHouse',
      )
      .innerJoin('commentToBoardingHouse.comment', 'comment')
      .addSelect('AVG(CAST(comment.star AS numeric)) as starAvg ')
      .groupBy('boardingHouse.id')
      .orderBy('starAvg', 'DESC');

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });
    // return items;

    let boardingHouses = await Promise.all(
      items.map(async (item) => {
        const boardingHouse =
          await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
            where: {
              id: item.id,
              // boardingHouseRentDeposits: { lang: lang },
              // boardingHouseRules: { lang: lang },
              // boardingHouseDescriptions: { lang: lang },
            },
            relations: {
              floors: { rooms: { roomImages: { localFile: true } } },
              user: { lessor: { avatar: true } },
              boardingHouseRentDeposits: true,
              boardingHouseDescriptions: true,
              boardingHouseRules: true,
              boardingHouseAddress: true,
              commentToBoardingHouses: {
                comment: { user: { customer: true } },
              },
              boardingHouseImages: { localFile: true },
            },
          });
        const star =
          await this.boardingHouseCommonService.getBoardingHouseAvgStar(item);
        const priceRange =
          await this.boardingHouseCommonService.getBoardingHousePriceRange(
            item,
          );
        const attributes =
          await this.boardingHouseCommonService.getBoardingHouseAttribute(item);
        // return { star, priceRange };
        return BoardingHouseResDto.forCustomer({
          dataBoardingHouse: boardingHouse,
          priceRange,
          attributes,
          star,
        });
      }),
    );

    return new Pagination(boardingHouses, meta);
  }
}
