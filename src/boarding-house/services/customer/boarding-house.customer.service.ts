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
import { Language } from 'src/common/enums/lang.enum';
import { RoomAttributeTermDetailRepository } from 'src/room/repositories/room-attribute-term-detail.repository';
import { AdminBoardingHouseStatus, Status } from 'src/common/enums/status.enum';

@Injectable()
export class BoardingHouseCustomerService {
  constructor(
    private boardingHouseRepo: BoardingHouseRepository,

    private boardingHouseCommonService: BoardingHouseCommonService,
    private roomAttributeTermDetailRepo: RoomAttributeTermDetailRepository,
  ) {}

  async findOne(id: number) {
    const boardingHouse =
      await this.boardingHouseRepo.findOneOrThrowNotFoundExc({
        where: {
          id,
        },
        relations: {
          floors: {
            rooms: {
              roomToAttributes: {
                roomAttributeTerm: { roomAttributeTermDetails: true },
              },
              roomImages: { localFile: true },
            },
          },
          commentToBoardingHouses: { comment: { user: { customer: true } } },
          user: { bookDisables: true },
          boardingHouseRentDeposits: true,
          boardingHouseRules: true,
          boardingHouseAddress: true,
          boardingHouseDescriptions: true,
        },
      });

    const queryBuilder = await this.roomAttributeTermDetailRepo
      .createQueryBuilder('roomAttributeTermDetail')

      .innerJoin(
        'roomAttributeTermDetail.roomAttributeTerm',
        'roomAttributeTerm',
      )
      .innerJoin('roomAttributeTerm.roomToAttributes', 'roomToAttribute')
      .innerJoin('roomToAttribute.room', 'room')
      .innerJoin('room.floor', 'floor')
      .innerJoin('floor.boardingHouse', 'boardingHouse')
      .andWhere('boardingHouse.id = :id', { id })
      // .andWhere('roomAttributeTermDetail.lang = :lang', { lang })

      .getMany();

    // return boardingHouse;
    return { boardingHouse, queryBuilder };
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
      .andWhere('boardingHouse.adminStatus = :adminStatus', {
        adminStatus: AdminBoardingHouseStatus.ACTIVE,
      })
      .andWhere('boardingHouse.status = :status', {
        status: Status.ACTIVE,
      })
      .leftJoinAndSelect(
        'boardingHouse.boardingHouseAddress',
        'boardingHouseAddress',
      );

    // .leftJoinAndSelect('boardingHouse.floors', 'floor')
    // .leftJoinAndSelect('floor.rooms', 'room');

    if (searchText) {
      searchText = `%${searchText}%`;
      queryBuilder.andWhere('boardingHouse.name ILIKE :searchText', {
        searchText,
      });
    }

    if (province) {
      queryBuilder.andWhere('boardingHouseAddress.province ILIKE :province', {
        province,
      });
    }

    if (district) {
      queryBuilder.andWhere('boardingHouseAddress.district ILIKE :district', {
        district,
      });
    }

    if (ward) {
      queryBuilder.andWhere('boardingHouseAddress.ward ILIKE :ward', { ward });
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
          await this.boardingHouseCommonService.getBoardingHouseAttribute(
            item,
            lang,
          );

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
    // return items;
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
      .andWhere('boardingHouse.adminStatus = :adminStatus', {
        adminStatus: AdminBoardingHouseStatus.ACTIVE,
      })
      .andWhere('boardingHouse.status = :status', {
        status: Status.ACTIVE,
      })
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
          await this.boardingHouseCommonService.getBoardingHouseAttribute(
            item,
            Language.VN,
          );
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
