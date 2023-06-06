import { Injectable } from '@nestjs/common';

import {
  CreateVnPay,
  CreateVnPayQue,
  GetListBillsReqDto,
  SelectVnPay,
} from './vnpay.req.dto';
// CommonJS
import { Response } from 'express';
import querystring from 'qs';
import * as crypto from 'crypto';

import { format, addMonths, addDays, differenceInDays } from 'date-fns';
import moment from 'moment';
import { PackType } from 'src/service-pack/enums/pack.enum';
import { User } from 'src/auth/entities/user.entity';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { number } from 'joi';
import { BillRepository } from './bill.repository';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
@Injectable()
export class VNPayService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly billRepo: BillRepository,
  ) {}
  // Triển khai các phương thức thanh toán VNPay ở đây

  async vnpay() {}

  async createVnPay(dto: CreateVnPay, user: User) {
    const createDate = moment().format('YYYYMMDDHHmmss');
    const locale = 'vn';
    const currCode = 'VND';
    let vnp_Params: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: process.env.vnp_TmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: this.generateRandomString(6),
      vnp_OrderInfo: 'Thanh toan cho ma GD:' + user.id + dto.packType,

      vnp_OrderType: 'other',
      vnp_Amount: Number(dto.amount) * 100,
      vnp_ReturnUrl: process.env.vnp_Returnurl,
      vnp_IpAddr: user.id,
      vnp_CreateDate: createDate,
    };

    vnp_Params = await this.sortObject(vnp_Params);
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', process.env.vnp_HashSecret);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    let vnpUrl = process.env.vnp_Url;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    return vnpUrl;
  }

  async vnpayPrice(dto: SelectVnPay, user: User) {
    let amount: number;
    if (dto.packType == PackType.BASIC) {
      amount = 400000;
    } else if (dto.packType == PackType.PREMIUM) {
      amount = 1000000;
    }
    const timeUse = await this.userRepo.findOne({
      where: { id: user.id },
      relations: { servicePack: true },
    });
    if (timeUse.servicePack != null) {
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

  private async sortObject(obj: any) {
    // eslint-disable-next-line prefer-const
    let sorted: any = {};
    const str = [];
    let key;
    for (key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }

  private generateRandomString(length: number): string {
    const digits = '0123456789';
    let randomString = '';

    while (randomString.length < length) {
      const randomByte = crypto.randomBytes(1)[0];
      if (randomByte < digits.length) {
        randomString += digits.charAt(randomByte);
      }
    }

    return randomString;
  }

  async create(dto: CreateVnPayQue, user: User) {
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

  async findOne(user: User, id: number) {
    const bill = await this.billRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
    });
    return bill;
  }

  async getGraph(dto: GetListBillsReqDto) {
    const { limit, page } = dto;
    const queryBuilder = this.billRepo.createQueryBuilder('bill');

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    // const statistics = items.reduce((result, item) => {
    //   const createdAt = new Date(item.createdAt);
    //   const month = createdAt.getMonth();

    //   // Kiểm tra xem đã tồn tại thống kê cho tháng này chưa
    //   const monthStatistic = result.find((stat) => stat.month === month);

    //   if (monthStatistic) {
    //     monthStatistic.total += parseInt(item.price, 10);
    //   } else {
    //     result.push({ month, total: parseInt(item.price, 10) });
    //   }

    //   return result;
    // }, []);

    // return statistics;

    const statistics = [];

    // Khởi tạo thống kê cho tất cả các tháng từ 0 (tháng 1) đến 11 (tháng 12)
    for (let i = 0; i < 12; i++) {
      statistics.push({ month: i, total: 0 });
    }

    // Tính toán thống kê theo tháng
    items.forEach((item) => {
      const createdAt = new Date(item.createdAt);
      const month = createdAt.getMonth();

      statistics[month].total += parseInt(item.price, 10) / 100;
    });

    return statistics;

    // return new Pagination(items, meta);
  }

  async getListBill(user: User, dto: GetListBillsReqDto) {
    const { limit, page } = dto;
    const queryBuilder = this.billRepo
      .createQueryBuilder('bill')
      .andWhere('bill.userId = :userId', {
        userId: user.id,
      });
    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    return new Pagination(items, meta);
  }
}
