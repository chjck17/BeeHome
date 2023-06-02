import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional';
import { User } from '../../../auth/entities/user.entity';
import { NotFoundExc } from '../../../common/exceptions/custom.exception';
import { RoomAttributeTermRepository } from '../../repositories/room-attribute-term.repository';
import { RoomAttributeTermDetailRepository } from '../../repositories/room-attribute-term-detail.repository';
import { RoomAttributeRepository } from '../../repositories/room-attribute.repository';
import { RoomAttributeDetailRepository } from '../../repositories/room-attribute-detail.repository';
import {
  CreateRoomAttributeTermReqDto,
  UpdateRoomAttributeTermDetailReqDto,
  UpdateRoomAttributeTermReqDto,
} from '../../dtos/lessor/req/room-attribute-term.lessor.req.dto';
import {
  CreateRoomAttributeReqDto,
  GetListRoomAttributeReqDto,
  GetListRoomAttributeTermReqDto,
  UpdateRoomAttributeDetailReqDto,
  UpdateRoomAttributeReqDto,
} from '../../dtos/lessor/req/room-attribute.lessor.req.dto';
import { RoomAttributeTerm } from '../../entities/room-attribute-term.entity';
import { RoomAttribute } from '../../entities/room-attribute.entity';
import { RoomAttributeDetail } from '../../entities/room-attribute-detail.entity';
import { In } from 'typeorm';
import { RoomAttributeTermDetail } from '../../entities/room-attribute-term-detail.entity';
import { DeleteListReqDto } from '../../../boarding-house/dtos/boarding-house.req.dto';
import { Language } from '../../../common/enums/lang.enum';

@Injectable()
export class RoomAttributeLessorService {
  constructor(
    private roomAttributeTermRepo: RoomAttributeTermRepository,
    private roomAttributeTermDetailRepo: RoomAttributeTermDetailRepository,
    private roomAttributeRepo: RoomAttributeRepository,
    private roomAttributeDetailRepo: RoomAttributeDetailRepository,
  ) {}
  @Transactional()
  async createData(user: User, dto: CreateRoomAttributeReqDto) {
    const { roomAttributeTerms, roomAttributeDetails } = dto;

    const data = [
      { lang: Language.VN, name: 'Trang thiết bị' },
      { lang: Language.EN, name: 'Equipment' },
    ];

    const dataTerm = [
      { lang: Language.VN, name: 'Máy lạnh', slug: 'may-lanh' },
      { lang: Language.EN, name: 'AC', slug: 'ac' },
    ];
    //create RoomAttributeTerm
    const roomAttribute = this.roomAttributeRepo.create({
      userId: user.id,
    });

    const createdRoomAttribute = await this.roomAttributeRepo.save(
      roomAttribute,
    );

    await Promise.all(
      roomAttributeDetails.map(async (item) => {
        const roomAttributeDetail = this.roomAttributeDetailRepo.create({
          roomAttributeId: createdRoomAttribute.id,
          lang: item.lang,
          name: item.name,
        });
        await this.roomAttributeDetailRepo.save(roomAttributeDetail);
      }),
    );
    await this.saveRoomAttributeTerms(
      createdRoomAttribute.id,
      roomAttributeTerms,
    );

    //-------------------------------------------------------------------
    const { limit, page } = dto;

    const queryBuilder = this.roomAttributeRepo
      .createQueryBuilder('roomAttribute')
      .leftJoinAndSelect(
        'roomAttribute.roomAttributeDetails',
        'roomAttributeDetail',
      )
      .leftJoinAndSelect(
        'roomAttribute.roomAttributeTerms',
        'roomAttributeTerm',
      )
      .leftJoinAndSelect(
        'roomAttributeTerm.roomAttributeTermDetails',
        'roomAttributeTermDetail',
      )
      .andWhere('roomAttribute.userId = :id', {
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
  async create(user: User, dto: CreateRoomAttributeReqDto) {
    const { roomAttributeTerms, roomAttributeDetails } = dto;

    //create RoomAttributeTerm
    const roomAttribute = this.roomAttributeRepo.create({
      userId: user.id,
    });

    const createdRoomAttribute = await this.roomAttributeRepo.save(
      roomAttribute,
    );

    await Promise.all(
      roomAttributeDetails.map(async (item) => {
        const roomAttributeDetail = this.roomAttributeDetailRepo.create({
          roomAttributeId: createdRoomAttribute.id,
          lang: item.lang,
          name: item.name,
        });
        await this.roomAttributeDetailRepo.save(roomAttributeDetail);
      }),
    );
    await this.saveRoomAttributeTerms(
      createdRoomAttribute.id,
      roomAttributeTerms,
    );

    //-------------------------------------------------------------------
    const { limit, page } = dto;

    const queryBuilder = this.roomAttributeRepo
      .createQueryBuilder('roomAttribute')
      .leftJoinAndSelect(
        'roomAttribute.roomAttributeDetails',
        'roomAttributeDetail',
      )
      .leftJoinAndSelect(
        'roomAttribute.roomAttributeTerms',
        'roomAttributeTerm',
      )
      .leftJoinAndSelect(
        'roomAttributeTerm.roomAttributeTermDetails',
        'roomAttributeTermDetail',
      )
      .andWhere('roomAttribute.userId = :id', {
        id: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
      cacheQueries: true,
    });
    return new Pagination(items, meta);
  }

  private async saveRoomAttributeTerms(
    roomAttributeId: number,
    roomAttributeTerms: CreateRoomAttributeTermReqDto[],
  ) {
    await Promise.all(
      roomAttributeTerms.map(async (ct) => {
        const roomAttributeTerm = await this.roomAttributeTermRepo.save({
          roomAttributeId: roomAttributeId,
        });
        await Promise.all(
          ct.roomAttributeTermDetails.map(
            async (item) =>
              await this.roomAttributeTermDetailRepo.save({
                roomAttributeTermId: roomAttributeTerm.id,
                lang: item.lang,
                name: item.name,
                slug: item.slug,
              }),
          ),
        );
      }),
    );
  }

  async getOne(user: User, id: number) {
    const roomAttribute =
      await this.roomAttributeRepo.findOneOrThrowNotFoundExc({
        where: { id: id, userId: user.id },
        relations: {
          roomAttributeTerms: { roomAttributeTermDetails: true },
          roomAttributeDetails: true,
        },
      });

    return roomAttribute;
  }

  async getListRoomAttribute(user: User, dto: GetListRoomAttributeReqDto) {
    const { limit, page } = dto;

    const queryBuilder = this.roomAttributeRepo
      .createQueryBuilder('roomAttribute')
      .leftJoinAndSelect(
        'roomAttribute.roomAttributeDetails',
        'roomAttributeDetail',
      )
      .leftJoinAndSelect(
        'roomAttribute.roomAttributeTerms',
        'roomAttributeTerm',
      )
      .leftJoinAndSelect(
        'roomAttributeTerm.roomAttributeTermDetails',
        'roomAttributeTermDetail',
      )
      .andWhere('roomAttribute.userId = :id', {
        id: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
      cacheQueries: true,
    });
    return new Pagination(items, meta);
  }
  async getListRoomAttributeTerm(
    user: User,
    dto: GetListRoomAttributeTermReqDto,
  ) {
    const { limit, page, lang } = dto;

    const queryBuilder = this.roomAttributeTermRepo
      .createQueryBuilder('roomAttributeTerm')
      .leftJoinAndSelect('roomAttributeTerm.roomAttribute', 'roomAttribute')
      .leftJoinAndSelect(
        'roomAttributeTerm.roomAttributeTermDetails',
        'roomAttributeTermDetail',
      )
      .andWhere('roomAttributeTermDetail.lang = :lang', {
        lang: lang ? lang : 'VN',
      })
      .andWhere('roomAttribute.userId = :id', {
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
  async update(user: User, dto: UpdateRoomAttributeReqDto) {
    const { id } = dto;

    const existedRoomAttribute =
      await this.roomAttributeRepo.findOneOrThrowNotFoundExc({
        where: { id, userId: user.id },
        relations: {
          roomAttributeTerms: { roomAttributeTermDetails: true },
          roomAttributeDetails: true,
        },
      });
    await this.saveItemTerms(
      id,
      existedRoomAttribute.roomAttributeTerms,
      dto.roomAttributeTerms,
    );

    await this.saveItemDetails(
      id,
      existedRoomAttribute.roomAttributeDetails,
      dto.roomAttributeDetails,
    );
  }

  private async saveItemTerms(
    itemId: number,
    itemDetails: RoomAttributeTerm[],
    itemDetailsDto: UpdateRoomAttributeTermReqDto[],
  ) {
    const itemDetailIdsToRemove: number[] = [];
    const itemDetailsToInsert: RoomAttributeTerm[] = [];
    const itemDetailsToUpdate: {
      id: number;
      roomAttributeTerm: RoomAttributeTerm;
      roomAttributeTermDto: UpdateRoomAttributeTermReqDto;
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
          this.roomAttributeTermRepo.create({
            roomAttributeId: itemId,
            roomAttributeTermDetails: dto.roomAttributeTermDetails,
          }),
        );
      }
    }

    await Promise.all([
      itemDetailsToUpdate.length &&
        itemDetailsToUpdate.map(async (item) =>
          this.saveItemTermDetails(
            item.id,
            item.roomAttributeTerm.roomAttributeTermDetails,
            item.roomAttributeTermDto.roomAttributeTermDetails,
          ),
        ),
      itemDetailIdsToRemove.length &&
        this.deleteMulti(itemDetailIdsToRemove, itemId),
    ]);

    if (itemDetailsToInsert.length) {
      await Promise.all(
        itemDetailsToInsert.map(async (itemDto) => {
          const roomAttributeTerm = await this.roomAttributeTermRepo.save({
            roomAttributeId: itemId,
          });
          const roomAttributeTermDetail = this.saveItemTermDetails(
            roomAttributeTerm.id,
            [],
            itemDto.roomAttributeTermDetails,
          );
          return roomAttributeTermDetail;
        }),
      );
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
          name: dto.name,
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
            name: dto.name,
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

  async deleteRoomAttribute(user: User, id: number) {
    const { affected } = await this.roomAttributeTermRepo
      .createQueryBuilder()
      .softDelete()
      .from(RoomAttribute)
      .where({ id })
      .andWhere({ userId: user.id })
      .execute();

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  async deleteRoomAttributes(user: User, dto: DeleteListReqDto) {
    const { ids } = dto;

    const { affected } = await this.roomAttributeTermRepo
      .createQueryBuilder()
      .softDelete()
      .from(RoomAttribute)
      .whereInIds(ids)
      .andWhere({ userId: user.id })
      .execute();

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  private async delete(id: number) {
    const { affected } = await this.roomAttributeTermRepo.softDelete(id);

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }

  private async deleteMulti(ids: number[], roomAttributeId: number) {
    await this.roomAttributeTermRepo
      .createQueryBuilder()
      .softDelete()
      .from(RoomAttributeTermDetail)
      .andWhere({ roomAttributeTermId: In(ids) })
      .execute();

    const { affected } = await this.roomAttributeTermRepo
      .createQueryBuilder()
      .softDelete()
      .from(RoomAttributeTerm)
      .whereInIds(ids)
      .andWhere({ roomAttributeId })
      .execute();

    if (!affected) throw new NotFoundExc('common.exc.notFound');
  }
}
