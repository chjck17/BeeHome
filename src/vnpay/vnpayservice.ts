import { Injectable } from '@nestjs/common';

import { CreateVnPay, SelectVnPay } from './vnpay.req.dto';
// CommonJS
import { Response } from 'express';
import querystring from 'qs';
import * as crypto from 'crypto';

import { format, addMonths, addDays, differenceInDays } from 'date-fns';
import moment from 'moment';
import { PackType } from 'src/service-pack/enums/pack.enum';
import { User } from 'src/auth/entities/user.entity';
import { UserRepository } from 'src/auth/repositories/user.repository';
@Injectable()
export class VNPayService {
  constructor(private readonly userRepo: UserRepository) {}
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
      vnp_OrderInfo: 'Thanh toan cho ma GD:' + user.id,
      vnp_OrderType: 'other',
      vnp_Amount: dto.amount,
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
    if (dto.status == PackType.BASIC) {
      amount = 400000;
    } else if (dto.status == PackType.PREMIUM) {
      amount = 1000000;
    }
    const timeUse = await this.userRepo.findOne({
      where: { id: user.id },
      relations: { servicePack: true },
    });
    if (timeUse.servicePack != null) {
      if (dto.status == PackType.PREMIUM) {
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
}
