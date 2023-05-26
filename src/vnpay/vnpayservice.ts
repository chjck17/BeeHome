import { Injectable } from '@nestjs/common';

import { CreateVnPay } from './vnpay.req.dto';
// CommonJS
import { Response } from 'express';
import querystring from 'qs';
import * as crypto from 'crypto';

import { format, addMonths, addDays } from 'date-fns';
import moment from 'moment';
@Injectable()
export class VNPayService {
  constructor() {}
  // Triển khai các phương thức thanh toán VNPay ở đây

  async vnpay() {}

  async createVnPay(dto: CreateVnPay) {
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
      vnp_OrderInfo: 'Thanh toan cho ma GD:' + 'duy-12',
      vnp_OrderType: 'other',
      vnp_Amount: Number(dto.amount) * 100,
      vnp_ReturnUrl: process.env.vnp_Returnurl,
      vnp_IpAddr: '13',
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
