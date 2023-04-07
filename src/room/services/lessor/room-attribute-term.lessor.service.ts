import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional';
import { User } from '../../../auth/entities/user.entity';
import {
  BadRequestExc,
  NotFoundExc,
} from '../../../common/exceptions/custom.exception';
// import { RoomAttributeTermResDto } from '../../dtos/common/res/roomAttributeTerm.res.dto';
import { LessorRepository } from '../../../auth/repositories/lessor.repository';
import { RoomAttributeTermRepository } from '../../repositories/room-attribute-term.repository';
import { RoomAttributeTermDetailRepository } from '../../repositories/room-attribute-term-detail.repository';
import { RoomAttributeRepository } from '../../repositories/room-attribute.repository';
import { RoomAttributeDetailRepository } from '../../repositories/room-attribute-detail.repository';
import {
  CreateRoomAttributeTermReqDto,
  DeleteRoomAttributeTermsReqDto,
  GetListRoomAttributeTermReqDto,
  UpdateRoomAttributeTermDetailReqDto,
  UpdateRoomAttributeTermReqDto,
} from '../../dtos/lessor/req/room-attribute.lessor.req.dto';
import {
  CreateRoomAttributeReqDto,
  UpdateRoomAttributeDetailReqDto,
  UpdateRoomAttributeReqDto,
} from '../../dtos/lessor/req/room-attribute-term.lessor.req.dto';
import { RoomAttributeTerm } from '../../entities/room-attribute-term.entity';
import { RoomAttribute } from '../../entities/room-attribute.entity';
import { RoomAttributeDetail } from '../../entities/room-attribute-detail.entity';
import { In } from 'typeorm';
import { RoomAttributeTermDetail } from '../../entities/room-attribute-term-detail.entity';

@Injectable()
export class RoomAttributeTermLessorService {
  constructor(
    private roomAttributeTermRepo: RoomAttributeTermRepository,
    private roomAttributeTermDetailRepo: RoomAttributeTermDetailRepository,
    private roomAttributeRepo: RoomAttributeRepository,
    private roomAttributeDetailRepo: RoomAttributeDetailRepository,
  ) {}

  @Transactional()
  async create(user: User, dto: CreateRoomAttributeTermReqDto) {
    const { roomAttributes, roomAttributeTermDetails } = dto;

    //create RoomAttributeTerm
    const roomAttributeTerm = this.roomAttributeTermRepo.create({
      userId: user.id,
    });

    const createdRoomAttributeTerm = await this.roomAttributeTermRepo.save(
      roomAttributeTerm,
    );

    await Promise.all([
      roomAttributeTermDetails.map(async (item) => {
        const roomAttributeTermDetail = this.roomAttributeTermDetailRepo.create(
          {
            roomAttributeTermId: createdRoomAttributeTerm.id,
            lang: item.lang,
            slug: item.slug,
            value: item.value,
          },
        );
        await this.roomAttributeTermDetailRepo.save(roomAttributeTermDetail);
      }),
    ]);
    await this.saveRoomAttribute(createdRoomAttributeTerm.id, roomAttributes);
  }

  private async saveRoomAttribute(
    roomAttributeTermId: number,
    roomAttributes: CreateRoomAttributeReqDto[],
  ) {
    await Promise.all([
      roomAttributes.map(async (ct) => {
        const roomAttributeTerm = await this.roomAttributeRepo.save({
          roomAttributeTermId: roomAttributeTermId,
        });
        ct.roomAttributeDetails.map(
          async (item) =>
            await this.roomAttributeDetailRepo.save({
              roomAttributeTermId: roomAttributeTerm.id,
              lang: item.lang,
              name: item.name,
            }),
        );
      }),
    ]);
  }

  async getOne(user: User, id: number) {
    const roomAttributeTerm =
      await this.roomAttributeTermRepo.findOneOrThrowNotFoundExc({
        where: { id: id, userId: user.id },
        relations: {
          roomAttributes: { roomAttributeDetails: true },
          roomAttributeTermDetails: true,
        },
      });

    return roomAttributeTerm;
  }

  async getListRoomAttributeTerm(
    user: User,
    dto: GetListRoomAttributeTermReqDto,
  ) {
    const { limit, page } = dto;

    const queryBuilder = this.roomAttributeTermRepo
      .createQueryBuilder('roomAttributeTerm')
      .leftJoinAndSelect(
        'roomAttributeTerm.roomAttributeTermDetails',
        'roomAttributeTermDetails',
      )
      .leftJoinAndSelect('roomAttributeTerm.roomAttributes', 'roomAttribute')
      .leftJoinAndSelect(
        'roomAttribute.roomAttributeDetails',
        'roomAttributeDetail',
      )
      .andWhere('roomAttributeTerm.userId = :id', {
        id: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
      cacheQueries: true,
    });
    return new Pagination(items, meta);
  }

  @Transactional()
  async update(
    user: User,
    updateRoomAttributeTermDto: UpdateRoomAttributeTermReqDto,
  ) {
    const { id } = updateRoomAttributeTermDto;

    const existedRoomAttributeTerm =
      await this.roomAttributeTermRepo.findOneOrThrowNotFoundExc({
        where: { id, userId: user.id },
        relations: {
          roomAttributes: { roomAttributeDetails: true },
          roomAttributeTermDetails: true,
        },
      });
    await this.saveItem(
      id,
      existedRoomAttributeTerm.roomAttributes,
      updateRoomAttributeTermDto.roomAttributes,
    );

    await this.saveItemTermDetails(
      id,
      existedRoomAttributeTerm.roomAttributeTermDetails,
      updateRoomAttributeTermDto.roomAttributeTermDetails,
    );
  }

  private async saveItem(
    itemId: number,
    itemDetails: RoomAttribute[],
    itemDetailsDto: UpdateRoomAttributeReqDto[],
  ) {
    const itemDetailIdsToRemove: number[] = [];
    const itemDetailsToInsert: RoomAttribute[] = [];
    const itemDetailsToUpdate: {
      id: number;
      roomAttributeTerm: RoomAttribute;
      roomAttributeTermDto: UpdateRoomAttributeReqDto;
    }[] = [];
    for (const itemDetail of itemDetails) {
      const dto = itemDetailsDto.find((dto) => dto.id === itemDetail.id);

      if (dto) {
        itemDetailsToUpdate.push({
          id: dto.id,
          roomAttributeTerm: itemDetail,
          roomAttributeTermDto: dto,
        });
      } else {
        itemDetailIdsToRemove.push(itemDetail.id);
      }
    }

    for (const dto of itemDetailsDto) {
      if (!dto.id) {
        itemDetailsToInsert.push(
          this.roomAttributeRepo.create({
            roomAttributeTermId: itemId,
            roomAttributeDetails: dto.roomAttributeDetails,
          }),
        );
      }
    }

    await Promise.all([
      itemDetailsToUpdate.length &&
        itemDetailsToUpdate.map(async (item) =>
          // this.roomAttributeTermRepo.update(item.id, item),
          this.saveItemDetails(
            item.id,
            item.roomAttributeTerm.roomAttributeDetails,
            item.roomAttributeTermDto.roomAttributeDetails,
          ),
        ),
      itemDetailIdsToRemove.length &&
        this.deleteMulti(itemDetailIdsToRemove, itemId),
    ]);

    if (itemDetailsToInsert.length) {
      // await this.roomAttributeTermRepo.insert(itemDetailsToInsert);

      await Promise.all(
        itemDetailsToInsert.map(async (itemDto) => {
          const roomAttributeTerm = await this.roomAttributeRepo.save({
            roomAttributeTermId: itemId,
          });
          const roomAttributeTermDetail = this.saveItemDetails(
            roomAttributeTerm.id,
            [],
            itemDto.roomAttributeDetails,
          );
          return roomAttributeTermDetail;
        }),
      );
    }
  }

  private async saveItemDetails(
    itemId: number,
    itemDetails: RoomAttributeDetail[],
    itemDetailsDto: UpdateRoomAttributeDetailReqDto[],
  ) {
    const itemDetailIdsToRemove: number[] = [];
    const itemDetailsToInsert: RoomAttributeDetail[] = [];
    const itemDetailsToUpdate: Partial<RoomAttributeDetail>[] = [];

    for (const itemDetail of itemDetails) {
      const dto = itemDetailsDto.find((dto) => dto.id === itemDetail.id);

      if (dto) {
        itemDetailsToUpdate.push({
          id: dto.id,
          lang: dto.lang,
          name: dto.name,
        });
      } else {
        itemDetailIdsToRemove.push(itemDetail.id);
      }
    }

    for (const dto of itemDetailsDto) {
      if (!dto.id) {
        itemDetailsToInsert.push(
          this.roomAttributeDetailRepo.create({
            roomAttributeId: itemId,
            lang: dto.lang,
            name: dto.name,
          }),
        );
      }
    }

    await Promise.all([
      itemDetailsToUpdate.map(async (item) =>
        this.roomAttributeDetailRepo.update(item.id, item),
      ),
      itemDetailIdsToRemove.length &&
        this.roomAttributeDetailRepo.softDelete(itemDetailIdsToRemove),
    ]);

    if (itemDetailsToInsert.length) {
      await this.roomAttributeDetailRepo.insert(itemDetailsToInsert);
    }
  }

  private async saveItemTermDetails(
    itemId: number,
    itemDetails: RoomAttributeTermDetail[],
    itemDetailsDto: UpdateRoomAttributeTermDetailReqDto[],
  ) {
    const itemDetailIdsToRemove: number[] = [];
    const itemDetailsToInsert: RoomAttributeTermDetail[] = [];
    const itemDetailsToUpdate: Partial<RoomAttributeTermDetail>[] = [];

    for (const itemDetail of itemDetails) {
      const dto = itemDetailsDto.find((dto) => dto.id === itemDetail.id);

      if (dto) {
        itemDetailsToUpdate.push({
          id: dto.id,
          lang: dto.lang,
          slug: dto.slug,
          value: dto.value,
        });
      } else {
        itemDetailIdsToRemove.push(itemDetail.id);
      }
    }

    for (const dto of itemDetailsDto) {
      if (!dto.id) {
        itemDetailsToInsert.push(
          this.roomAttributeTermDetailRepo.create({
            roomAttributeTermId: itemId,
            lang: dto.lang,
            slug: dto.slug,
            value: dto.value,
          }),
        );
      }
    }

    await Promise.all([
      itemDetailsToUpdate.map(async (item) =>
        this.roomAttributeTermDetailRepo.update(item.id, item),
      ),
      itemDetailIdsToRemove.length &&
        this.roomAttributeTermDetailRepo.softDelete(itemDetailIdsToRemove),
    ]);

    if (itemDetailsToInsert.length) {
      await this.roomAttributeTermDetailRepo.insert(itemDetailsToInsert);
    }
  }

  async deleteRoomAttributeTerm(user: User, id: number) {
    const { affected } = await this.roomAttributeTermRepo
      .createQueryBuilder()
      .softDelete()
      .from(RoomAttributeTerm)
      .where({ id })
      .andWhere({ userId: user.id })
      .execute();

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  async deleteRoomAttributeTerms(
    user: User,
    deleteRoomAttributeTermsLessorReqDto: DeleteRoomAttributeTermsReqDto,
  ) {
    const { ids } = deleteRoomAttributeTermsLessorReqDto;

    const { affected } = await this.roomAttributeTermRepo
      .createQueryBuilder()
      .softDelete()
      .from(RoomAttributeTerm)
      .whereInIds(ids)
      .andWhere({ userId: user.id })
      .execute();

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  private async delete(id: number) {
    const { affected } = await this.roomAttributeRepo.softDelete(id);

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  private async deleteMulti(ids: number[], roomAttributeTermId: number) {
    await this.roomAttributeDetailRepo
      .createQueryBuilder()
      .softDelete()
      .from(RoomAttributeDetail)
      .andWhere({ roomAttributeTermId: In(ids) })
      .execute();

    const { affected } = await this.roomAttributeRepo
      .createQueryBuilder()
      .softDelete()
      .from(RoomAttribute)
      .whereInIds(ids)
      .andWhere({ roomAttributeTermId })
      .execute();

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }
}
