import { Injectable } from '@nestjs/common';
import { ServicePackRepository } from '../repositories/service-pack.repository';
import { CreateServicePackReqDto } from '../dtos/lessor/service-pack.lessor.req.dto';
import { User } from 'src/auth/entities/user.entity';
import { addMonths, format } from 'date-fns';
@Injectable()
export class ServicePackLessorService {
  constructor(private servicePackRepo: ServicePackRepository) {}
  async createServicePack(dto: CreateServicePackReqDto, user: User) {
    const { packType, startDate } = dto;

    const exitPack = this.servicePackRepo.findOneBy({
      userId: user.id,
    });
    if (!exitPack) {
      const pack = this.servicePackRepo.create({
        userId: user.id,
        endDate: this.getModifiedDate(startDate),
        startDate: startDate,
      });
      await this.servicePackRepo.save(pack);
      return pack;
    }
    const pack = this.servicePackRepo.create({
      ...exitPack,
      userId: user.id,
      endDate: this.getModifiedDate(startDate),
      startDate: startDate,
    });
    await this.servicePackRepo.save(pack);
    return pack;

    // await this.servicePackRepo.save(pack);
  }

  private getModifiedDate(dateString: Date): Date {
    const date = new Date(dateString);
    const modifiedDate = addMonths(date, 3);
    // const formattedDate = format(modifiedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    return modifiedDate;
  }

  async getPack(userId: number) {
    const queryBuilder = this.servicePackRepo.findOne({
      where: { userId: userId },
      relations: { user: { lessor: true } },
    });

    return queryBuilder;
  }
  // async updateRoom(dto: UpdateRoomReqDto) {
  //   const {
  //     roomId,
  //     name,
  //     status,
  //     acreage,
  //     price,
  //     categoryIds,
  //     attributeIds,
  //     imgIds,
  //     roomSimple,
  //     toilet,
  //   } = dto;
  //   const existRoom = await this.roomRepo.findOne({
  //     where: { id: roomId },
  //     relations: {
  //       roomToCategories: { categoryType: true },
  //       roomToAttributes: { roomAttributeTerm: true },
  //       roomImages: { localFile: true },
  //     },
  //   });
  //   if (!existRoom) {
  //     throw new ConflictExc('common');
  //   }
  //   const room = this.roomRepo.create({
  //     ...existRoom,
  //     status: status,
  //     name: name,
  //     acreage: acreage,
  //     price: price,
  //     roomSimple: roomSimple,
  //     toilet: toilet,
  //   });
  //   await this.roomRepo.save(room);
  //   await this.saveItemCategory(
  //     room.id,
  //     existRoom.roomToCategories,
  //     categoryIds,
  //   );
  //   await this.saveItemAttribute(
  //     room.id,
  //     existRoom.roomToAttributes,
  //     attributeIds,
  //   );

  //   await this.saveItemImgRoom(room.id, existRoom.roomImages, imgIds);
  //   // return room;
  //   // return { test1, test2 };
  // }
  //   async findOne(user: User, id: number) {
  //     const room = await this.roomRepo.findOneOrThrowNotFoundExc({
  //       where: { id },
  //       relations: {
  //         roomImages: { localFile: true },
  //         roomToAttributes: {
  //           roomAttributeTerm: { roomAttributeTermDetails: true },
  //         },
  //         roomToCategories: { categoryType: { categoryTypeDetails: true } },
  //       },
  //     });
  //     return room;
  //   }

  //   async deleteRoom(user: User, id: number) {
  //     const product = await this.roomRepo.findOneOrThrowNotFoundExc({
  //       where: { id },
  //       relations: { roomImages: { localFile: true } },
  //     });
  //     // return product;

  //     product.roomImages.map((item) => {
  //       const filePath = path.join(
  //         __dirname,
  //         '../../../../../upload/single',
  //         item.localFile.filename,
  //       );

  //       fs.unlink(filePath, (err) => {
  //         if (err) {
  //           console.error(err);
  //         } else {
  //           console.log('File deleted successfully');
  //         }
  //       });
  //     });

  //     if (product) {
  //       await this.roomRepo.softDelete(id);
  //     }
  //   }

  //   async deleteListRoom(
  //     dto: DeleteListReqDto,
  //     user: User,
  //   ): Promise<TypeORMQueryResult> {
  //     const { ids } = dto;

  //     const result = await this.roomRepo.softDelete({
  //       id: In(ids),
  //     });

  //     if (result.affected !== ids.length) throw new BadRequestExc('common');

  //     return result;
  //   }

  //   private async saveItemCategory(
  //     itemId: number,
  //     items: RoomToCategory[],
  //     itemsDto: string[],
  //   ) {
  //     const itemIdsToRemove: number[] = [];
  //     const itemToInsert: RoomToCategory[] = [];

  //     for (const itemInDb of items) {
  //       const dto = itemsDto.find((id) => Number(id) === itemInDb.id);
  //       if (!dto) {
  //         itemIdsToRemove.push(itemInDb.id);
  //       }
  //     }

  //     for (const id of itemsDto) {
  //       const dto = items.find((item) => Number(id) === item.id);

  //       if (!dto) {
  //         itemToInsert.push(
  //           this.roomToCategoryRepo.create({
  //             roomId: itemId,
  //             categoryTypeId: Number(id),
  //           }),
  //         );
  //       }
  //     }

  //     await Promise.all([
  //       itemIdsToRemove.length && this.roomToCategoryRepo.delete(itemIdsToRemove),
  //     ]);

  //     if (itemToInsert.length) {
  //       await this.roomToCategoryRepo.insert(itemToInsert);
  //     }
  //     return { itemIdsToRemove, itemToInsert };
  //   }
  //   private async saveItemAttribute(
  //     itemId: number,
  //     items: RoomToAttribute[],
  //     itemsDto: string[],
  //   ) {
  //     const itemIdsToRemove: number[] = [];
  //     const itemToInsert: RoomToAttribute[] = [];

  //     for (const itemInDb of items) {
  //       const dto = itemsDto.find((id) => Number(id) === itemInDb.id);
  //       if (!dto) {
  //         itemIdsToRemove.push(itemInDb.id);
  //       }
  //     }

  //     for (const id of itemsDto) {
  //       const dto = items.find((item) => Number(id) === item.id);
  //       if (!dto) {
  //         itemToInsert.push(
  //           this.roomToAttributeRepo.create({
  //             roomId: itemId,
  //             roomAttributeTermId: Number(id),
  //           }),
  //         );
  //       }
  //     }

  //     await Promise.all([
  //       itemIdsToRemove.length &&
  //         this.roomToAttributeRepo.delete(itemIdsToRemove),
  //     ]);

  //     if (itemToInsert.length) {
  //       await this.roomToAttributeRepo.insert(itemToInsert);
  //     }
  //     return { itemIdsToRemove, itemToInsert };
  //   }

  //   private async saveItemImgRoom(
  //     itemId: number,
  //     items: RoomImage[],
  //     itemsDto: number[],
  //   ) {
  //     const itemIdsToRemove: number[] = [];
  //     const itemToInsert: RoomImage[] = [];

  //     for (const itemInDb of items) {
  //       const dto = itemsDto.find((id) => Number(id) === itemInDb.id);
  //       if (!dto) {
  //         itemIdsToRemove.push(itemInDb.id);
  //       }
  //     }

  //     for (const id of itemsDto) {
  //       const dto = items.find((item) => Number(id) === item.id);
  //       if (!dto) {
  //         itemToInsert.push(
  //           this.roomImageRepo.create({
  //             roomId: itemId,
  //             localFileId: Number(id),
  //           }),
  //         );
  //       }
  //     }

  //     await Promise.all([
  //       itemIdsToRemove.length && this.roomImageRepo.delete(itemIdsToRemove),
  //     ]);

  //     if (itemToInsert.length) {
  //       await this.roomImageRepo.insert(itemToInsert);
  //     }
  //     return { itemIdsToRemove, itemToInsert };
  //   }
}
