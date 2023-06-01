import { ForbiddenException, Injectable } from '@nestjs/common';
import { ServicePackRepository } from '../repositories/service-pack.repository';
import {
  CreateServicePackReqDto,
  ServicePackPrice,
} from '../dtos/lessor/service-pack.lessor.req.dto';
import { User } from 'src/auth/entities/user.entity';
import { addMonths, format, differenceInDays } from 'date-fns';

import { UserRepository } from 'src/auth/repositories/user.repository';
import { LessorRepository } from 'src/auth/repositories/lessor.repository';
import { SelectVnPay } from 'src/vnpay/vnpay.req.dto';
import { PackType } from '../enums/pack.enum';
import { BillRepository } from 'src/vnpay/bill.repository';
@Injectable()
export class ServicePackLessorService {
  constructor(
    private servicePackRepo: ServicePackRepository,
    private userRepo: UserRepository,
    private lessorRepo: LessorRepository,
    private readonly billRepo: BillRepository,
  ) {}
  async createServicePack(dto: CreateServicePackReqDto, user: User) {
    const { startDate, packType } = dto;

    const userExit = await this.userRepo.findOne({
      where: { id: user.id },
      relations: { lessor: true },
    });
    await this.lessorRepo.update(
      { id: userExit.lessor.id },
      { packType: packType },
    );
    await this.servicePackRepo.delete({ userId: user.id });
    if (packType !== PackType.FREE) {
      const pack = this.servicePackRepo.create({
        userId: user.id,
        endDate: this.getModifiedDate(startDate),
        startDate: startDate,
      });
      await this.servicePackRepo.save(pack);
      const bill = this.billRepo.create({
        userId: user.id,
        name: dto.vnp_TxnRef,
        packType: dto.packType,
        transactionId: dto.vnp_TransactionNo,
        transactionTitle: dto.vnp_OrderInfo,
        price: dto.vnp_Amount,
        bank: dto.vnp_BankCode,
        cardType: dto.vnp_CardType,
      });
      await this.billRepo.save(bill);
      return bill;
    }
  }

  async servicePackPrice(dto: ServicePackPrice, user: User) {
    let amount: number;
    if (dto.packType == PackType.BASIC) {
      amount = 400000;
    } else if (dto.packType == PackType.PREMIUM) {
      amount = 1000000;
    }
    const timeUse = await this.userRepo.findOne({
      where: { id: user.id },
      relations: { servicePack: true, lessor: true },
    });

    const today = new Date();
    if (
      differenceInDays(timeUse?.servicePack?.endDate, today) > 4 &&
      dto.packType != PackType.PREMIUM
    ) {
      throw new ForbiddenException('Khong trong thoi gian dang ky');
    }
    if (timeUse.lessor.packType === PackType.BASIC) {
      if (dto.packType == PackType.PREMIUM) {
        const numberOfDaysPack = differenceInDays(
          timeUse.servicePack.endDate,
          timeUse.servicePack.startDate,
        );
        const today = new Date();
        const numberOfDaysNotUse = differenceInDays(
          timeUse.servicePack.endDate,
          today,
        );
        amount = Math.floor(
          amount - (400000 * numberOfDaysNotUse) / numberOfDaysPack,
        );
      }
      return amount;
    }
    return amount;
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

  async checkExpiryAndSendNotification() {
    // Lấy danh sách người dùng có gói đăng ký sắp hết hạn
    const exitPack = await this.servicePackRepo.find({
      relations: { user: { customer: true } },
    });
    // Kiểm tra từng người dùng

    exitPack.forEach(async (item) => {
      const expiryDate = item.endDate;
      const currentDate = new Date();
      const numberOfDaysPack = differenceInDays(currentDate, expiryDate);
      // Nếu ngày hết hạn đã đến hoặc qua, gửi thông báo cho người dùng
      if (numberOfDaysPack >= 7) {
        await this.servicePackRepo.softDelete(item.id);
      }
    });
  }

  async startNotificationChecking() {
    const sevenDate = 24 * 60 * 60 * 1000;

    setInterval(() => {
      this.checkExpiryAndSendNotification();
    }, sevenDate);
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
