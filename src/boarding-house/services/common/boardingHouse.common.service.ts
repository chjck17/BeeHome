import { Injectable } from '@nestjs/common';
import { BoardingHouseRepository } from '../../repositories/boarding-house.repository';
import { BoardingHouse } from '../../entities/boarding-house.entity';
import {
  BoardingHousePriceResDto,
  BoardingHouseStarResDto,
} from '../../dtos/common/misc.res.dto';
import { RoomRepository } from '../../../room/repositories/room.repository';
import { FloorRepository } from '../../../floor/repositories/floor.repository';
import { Floor } from '../../../floor/entities/floor.entity';
import { RoomAttributeRepository } from '../../../room/repositories/room-attribute.repository';
import { RoomAttributeTermRepository } from '../../../room/repositories/room-attribute-term.repository';
import { RoomAttributeTermDetailRepository } from '../../../room/repositories/room-attribute-term-detail.repository';
import { CommentRepository } from '../../../comment/repositories/comment.repository';
import { Language } from 'src/common/enums/lang.enum';

@Injectable()
export class BoardingHouseCommonService {
  constructor(
    private boardingHouseRepo: BoardingHouseRepository,
    private roomRepo: RoomRepository,
    private roomAttributeTermDetailRepo: RoomAttributeTermDetailRepository,
    private commentRepo: CommentRepository,

    private floorRepo: FloorRepository,
  ) {}

  async getBoardingHousePriceRange(
    boardingHouse: BoardingHouse,
  ): Promise<BoardingHousePriceResDto> {
    const result = new BoardingHousePriceResDto();

    const queryBuilder = this.roomRepo
      .createQueryBuilder('room')
      .innerJoin('room.floor', 'floor')
      .innerJoin('floor.boardingHouse', 'boardingHouse')

      .where('boardingHouse.id = :id', { id: boardingHouse.id });

    let priceRange: { minPrice: number; maxPrice: number };
    // if (product.onSale) {
    priceRange = await queryBuilder
      .select('MAX(room.price)', 'maxPrice')
      .addSelect('MIN(room.price)', 'minPrice')
      .getRawOne();
    // } else {
    //   priceRange = await queryBuilder
    //     .select('MAX(pv.price)', 'maxPrice')
    //     .addSelect('MIN(pv.price)', 'minPrice')
    //     .getRawOne();
    // }

    result.range = {
      min: Number(priceRange?.minPrice),
      max: Number(priceRange?.maxPrice),
    };

    return result;
  }

  async getBoardingHouseAvgStar(
    boardingHouse: BoardingHouse,
  ): Promise<BoardingHouseStarResDto> {
    const result = new BoardingHouseStarResDto();

    const queryBuilder = this.commentRepo
      .createQueryBuilder('comment')
      .innerJoin('comment.commentToBoardingHouses', 'commentToBoardingHouse')
      .innerJoin('commentToBoardingHouse.boardingHouse', 'boardingHouse')
      .where('boardingHouse.id = :id', { id: boardingHouse.id });

    let starAvg: { avgStar: number };
    // if (product.onSale) {
    starAvg = await queryBuilder
      .select('AVG(CAST(comment.star AS numeric))', 'avgStar')
      // .groupBy('comment.created_at')
      .getRawOne();

    result.avg = starAvg.avgStar;

    return result;
  }

  async getBoardingHouseAttribute(
    boardingHouse: BoardingHouse,
    lang: Language,
  ) {
    // const result = new BoardingHousePriceResDto();

    const queryBuilder = this.roomAttributeTermDetailRepo
      .createQueryBuilder('roomAttributeTermDetail')
      .innerJoin(
        'roomAttributeTermDetail.roomAttributeTerm',
        'roomAttributeTerm',
      )

      .innerJoin('roomAttributeTerm.roomToAttributes', 'roomToAttribute')
      .innerJoin('roomToAttribute.room', 'room')

      .innerJoin('room.floor', 'floor')
      .innerJoin('floor.boardingHouse', 'boardingHouse')

      .andWhere('boardingHouse.id = :id', { id: boardingHouse.id })
      .andWhere('roomAttributeTermDetail.lang = :lang', { lang })

      .getMany();

    return queryBuilder;
  }
  // async getProductPointRange(product: Product): Promise<ProductPointResDto> {
  //   const result = new ProductPointResDto();

  //   switch (product.type) {
  //     case ProductType.SIMPLE:
  //     case ProductType.VIRTUAL:
  //       const productToVariant = await this.productToVariantRepo.findOne({
  //         where: { productId: product.id },
  //         relations: { productVariant: { productVariantPoint: true } },
  //       });
  //       result.normalPoint =
  //         productToVariant?.productVariant?.productVariantPoint?.point || 0;
  //       result.salePoint =
  //         productToVariant?.productVariant?.productVariantPoint?.salePoint || 0;
  //       break;
  //     case ProductType.CONFIGURABLE:
  //       const queryBuilder = this.productVariantRepo
  //         .createQueryBuilder('pv')
  //         .innerJoin('pv.productToVariants', 'ptv')
  //         .innerJoin('pv.productVariantPoint', 'pvp')
  //         .where('ptv.productId = :productId', { productId: product.id });

  //       let pointRange: { minPoint: number; maxPoint: number };
  //       if (product.onSale) {
  //         pointRange = await queryBuilder
  //           .select('MAX(pvp.point)', 'maxPoint')
  //           .addSelect('MIN(pvp.sale_point)', 'minPoint')
  //           .getRawOne();
  //       } else {
  //         pointRange = await queryBuilder
  //           .select('MAX(pvp.point)', 'maxPoint')
  //           .addSelect('MIN(pvp.sale_point)', 'minPoint')
  //           .getRawOne();
  //       }

  //       result.range = {
  //         min: Number(pointRange?.minPoint),
  //         max: Number(pointRange?.maxPoint),
  //       };
  //       break;
  //     default:
  //       return null;
  //   }

  //   return result;
  // }

  // async checkProductToVariantValid(productToVariantId: number) {}
}
