import { ConflictException, Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { In } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import {
  BadRequestExc,
  ConflictExc,
} from '../../../common/exceptions/custom.exception';
import { TypeORMQueryResult } from '../../../common/dtos/sql-query-result.dto';
import {
  CheckRoomNumberReqDto,
  CreateRoomReqDto,
  GetListRoomsReqDto,
  UpdateRoomReqDto,
} from '../../dtos/lessor/req/room.req.dto';
import { RoomRepository } from '../../repositories/room.repository';
import { DeleteListReqDto } from '../../../boarding-house/dtos/boarding-house.req.dto';
import { RoomImageRepository } from '../../repositories/room-image.repository';
import { LocalFile } from '../../../local-file/local-file.entity';
import { RoomStatus } from '../../enums/room.enum';
import { RoomToAttributeRepository } from '../../repositories/room-to-attribute.repository';
import { RoomToAttribute } from '../../entities/room-to-attribute.entity';
import * as fs from 'fs';
import * as path from 'path';
import { RoomImage } from '../../entities/room-image.entity';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { Lessor } from 'src/auth/entities/lessor.entity';
import { BoardingHouse } from 'src/boarding-house/entities/boarding-house.entity';
import { PackType } from 'src/service-pack/enums/pack.enum';

@Injectable()
export class RoomLessorService {
  constructor(
    private roomRepo: RoomRepository,
    private roomImageRepo: RoomImageRepository,
    private roomToAttributeRepo: RoomToAttributeRepository,
    private userRepo: UserRepository,
  ) {}

  async checkRoomNumber(user: User) {
    const roomExist = await this.userRepo.findOne({
      where: { id: user.id },
      relations: { boardingHouses: { floors: { rooms: true } }, lessor: true },
    });

    let totalRooms = 0;

    if (roomExist && roomExist.boardingHouses) {
      for (const boardingHouse of roomExist.boardingHouses) {
        if (boardingHouse.floors) {
          for (const floor of boardingHouse.floors) {
            if (floor.rooms) {
              totalRooms += floor.rooms.length;
            }
          }
        }
      }
    }
    //
    if (totalRooms >= 20 && roomExist.lessor.packType === PackType.BASIC)
      throw new ConflictException('out of room');

    if (totalRooms >= 1 && roomExist.lessor.packType === PackType.FREE)
      throw new ConflictException('out of room');

    return totalRooms;
  }

  async createRoom(dto: CreateRoomReqDto) {
    const {
      name,
      price,
      acreage,
      floorId,
      // categoryIds,
      attributeIds,
      imgIds,
      roomSimple,
      toilet,
    } = dto;

    const room = this.roomRepo.create({
      floorId: floorId,
      name: name,
      price: price,
      acreage: acreage,
      roomSimple: roomSimple,
      toilet: toilet,
      status: RoomStatus.ACTIVE,
    });
    await this.roomRepo.save(room);

    await Promise.all(
      imgIds.map(async (id) => {
        const roomImage = this.roomImageRepo.create({
          roomId: room.id,
          localFileId: id,
        });
        await this.roomImageRepo.save(roomImage);
      }),
    );
    // await Promise.all(
    //   categoryIds.map(async (id) => {
    //     const roomCategory = this.roomToCategoryRepo.create({
    //       roomId: room.id,
    //       categoryTypeId: Number(id),
    //     });
    //     await this.roomToCategoryRepo.save(roomCategory);
    //   }),
    // );
    await Promise.all(
      attributeIds.map(async (id) => {
        const roomAttribute = this.roomToAttributeRepo.create({
          roomId: room.id,
          roomAttributeTermId: Number(id),
        });
        await this.roomToAttributeRepo.save(roomAttribute);
      }),
    );
    return room;
    // return dto;
  }
  async updateRoom(dto: UpdateRoomReqDto) {
    const {
      roomId,
      name,
      status,
      acreage,
      price,
      // categoryIds,
      attributeIds,
      imgIds,
      roomSimple,
      toilet,
    } = dto;
    const existRoom = await this.roomRepo.findOne({
      where: { id: roomId },
      relations: {
        // roomToCategories: { categoryType: true },
        roomToAttributes: { roomAttributeTerm: true },
        roomImages: { localFile: true },
      },
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
      roomSimple: roomSimple,
      toilet: toilet,
    });
    await this.roomRepo.save(room);
    // await this.saveItemCategory(
    //   room.id,
    //   existRoom.roomToCategories,
    //   categoryIds,
    // );
    await this.saveItemAttribute(
      room.id,
      existRoom.roomToAttributes,
      attributeIds,
    );

    await this.saveItemImgRoom(room.id, existRoom.roomImages, imgIds);
    // return room;
    // return { test1, test2 };
  }
  async findOne(user: User, id: number) {
    const room = await this.roomRepo.findOneOrThrowNotFoundExc({
      where: { id },
      relations: {
        roomImages: { localFile: true },
        roomToAttributes: {
          roomAttributeTerm: { roomAttributeTermDetails: true },
        },
        // roomToCategories: { categoryType: { categoryTypeDetails: true } },
      },
    });
    return room;
  }
  async getListRoom(user: User, dto: GetListRoomsReqDto) {
    const { limit, page } = dto;
    const queryBuilder = this.roomRepo
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.floor', 'floor')
      .leftJoinAndSelect('floor.boardingHouse', 'boardingHouse')
      .leftJoinAndSelect('boardingHouse.user', 'user')
      .andWhere('user.id = :userId', {
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
      relations: { roomImages: { localFile: true } },
    });
    // return product;

    product.roomImages.map((item) => {
      const filePath = path.join(
        __dirname,
        '../../../../../upload/single',
        item.localFile.filename,
      );

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File deleted successfully');
        }
      });
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

  private async saveItemAttribute(
    itemId: number,
    items: RoomToAttribute[],
    itemsDto: string[],
  ) {
    const itemIdsToRemove: number[] = [];
    const itemToInsert: RoomToAttribute[] = [];

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
          this.roomToAttributeRepo.create({
            roomId: itemId,
            roomAttributeTermId: Number(id),
          }),
        );
      }
    }

    await Promise.all([
      itemIdsToRemove.length &&
        this.roomToAttributeRepo.delete(itemIdsToRemove),
    ]);

    if (itemToInsert.length) {
      await this.roomToAttributeRepo.insert(itemToInsert);
    }
    return { itemIdsToRemove, itemToInsert };
  }

  private async saveItemImgRoom(
    itemId: number,
    items: RoomImage[],
    itemsDto: number[],
  ) {
    const itemIdsToRemove: number[] = [];
    const itemToInsert: RoomImage[] = [];

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
          this.roomImageRepo.create({
            roomId: itemId,
            localFileId: Number(id),
          }),
        );
      }
    }

    await Promise.all([
      itemIdsToRemove.length && this.roomImageRepo.delete(itemIdsToRemove),
    ]);

    if (itemToInsert.length) {
      await this.roomImageRepo.insert(itemToInsert);
    }
    return { itemIdsToRemove, itemToInsert };
  }
}
