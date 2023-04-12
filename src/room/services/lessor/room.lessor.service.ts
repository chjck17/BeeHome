import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { In } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import {
  BadRequestExc,
  ConflictExc,
} from '../../../common/exceptions/custom.exception';
import { TypeORMQueryResult } from '../../../common/dtos/sql-query-result.dto';
import {
  CreateRoomReqDto,
  GetListRoomsReqDto,
  UpdateRoomReqDto,
} from '../../dtos/lessor/req/room.req.dto';
import { RoomRepository } from '../../repositories/room.repository';
import { DeleteListReqDto } from '../../../boarding-house/dtos/boarding-house.req.dto';
import { RoomImageRepository } from '../../repositories/room-image.repository';
import { LocalFile } from '../../../local-file/local-file.entity';

@Injectable()
export class RoomLessorService {
  constructor(
    private roomRepo: RoomRepository,
    private roomImageRepo: RoomImageRepository,
  ) {}
  async createRoom(dto: CreateRoomReqDto, imgIds: LocalFile[]) {
    const { name, price, acreage, status, floorId } = dto;
    const room = this.roomRepo.create({
      floorId: floorId,
      name: name,
      price: price,
      acreage: acreage,
      status: status,
    });
    await this.roomRepo.save(room);

    await Promise.all(
      imgIds.map(async (item) => {
        const roomImage = this.roomImageRepo.create({
          roomId: room.id,
          localFileId: item.id,
        });
        await this.roomImageRepo.save(roomImage);
      }),
    );

    return room;
  }
  async updateRoom(dto: UpdateRoomReqDto) {
    const { floorId, roomId, name, status, acreage, price } = dto;
    const existRoom = await this.roomRepo.findOneBy({
      id: roomId,
    });
    if (!existRoom) {
      throw new ConflictExc('common');
    }
    const room = this.roomRepo.create({
      ...existRoom,
      status: status,
      name: name,
      acreage: acreage,
      price: price,
    });
    await this.roomRepo.save(room);
    return room;
  }
  async findOne(user: User, id: number) {
    const room = await this.roomRepo.findOneOrThrowNotFoundExc({
      where: { id },
    });
    return room;
  }

  async getListRoom(user: User, dto: GetListRoomsReqDto) {
    const { limit, page } = dto;
    const queryBuilder = this.roomRepo
      .createQueryBuilder('room')
      .andWhere('room.userId = :userId', {
        userId: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    return new Pagination(items, meta);
  }

  async deleteRoom(user: User, id: number) {
    const product = await this.roomRepo.findOneOrThrowNotFoundExc({
      where: { id },
    });
    if (product) {
      await this.roomRepo.softDelete(id);
    }
  }

  async deleteListRoom(
    dto: DeleteListReqDto,
    user: User,
  ): Promise<TypeORMQueryResult> {
    const { ids } = dto;

    const result = await this.roomRepo.softDelete({
      id: In(ids),
    });

    if (result.affected !== ids.length) throw new BadRequestExc('common');

    return result;
  }
}
