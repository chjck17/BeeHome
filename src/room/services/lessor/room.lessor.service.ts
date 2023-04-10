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

@Injectable()
export class RoomLessorService {
  constructor(private roomRepo: RoomRepository) {}

  async createRoom(user: User, dto: CreateRoomReqDto) {
    const room = this.roomRepo.create({});
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

  async updateRoom(user: User, id: number, dto: UpdateRoomReqDto) {
    const existRoom = await this.roomRepo.findOneBy({
      id: id,
    });
    if (!existRoom) {
      throw new ConflictExc('common');
    }
    const room = this.roomRepo.create({
      ...existRoom,
    });
    await this.roomRepo.save(room);
    return room;
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
