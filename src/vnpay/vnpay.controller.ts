// src/vnpay/vnpay.controller.ts
import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { VNPayService } from './vnpayservice';
import { Response } from 'express';
import querystring from 'qs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { CreateVnPay, CreateVnPayQue } from './vnpay.req.dto';

import { format, addMonths, addDays } from 'date-fns';
import moment from 'moment';

@Controller('vn-pay')
export class VNPayController {
  constructor(
    private readonly vnpayService: VNPayService,

    private readonly configService: ConfigService,
  ) {}

  // Xử lý các yêu cầu thanh toán VNPay từ phía client ở đây

  // private async buildCheckoutUrl(
  //   userPaymentId: number,
  //   payload: CheckoutPayload,
  // ) {
  //   // await this.vnPaysModel.create({
  //   //   vpc_MerchTxnRef: payload.transactionId,
  //   //   userPaymentId: userPaymentId,
  //   //   amount: payload.amount,
  //   //   status: EVNPayStatus.CREATE,
  //   //   module: module,
  //   //   rawCheckout: payload,
  //   //   vpc_OrderInfo: payload.orderId,
  //   //   vpc_TicketNo: payload.clientIp,
  //   // })
  // }

  @Post('create_payment_url')
  async createVnPay(@Body() dto: CreateVnPay) {
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

  @Get('vnpay_return')
  vnpayReturn(@Query() query: CreateVnPayQue) {
    return query;
  }

  // @Get('vnpay_return')
  // handleReturn(@Query() vnpParams: any, @Res() res: Response) {
  //   console.log(vnpParams, res);

  //   // const { vnp_SecureHash, vnp_ResponseCode } = vnpParams;
  //   // delete vnpParams['vnp_SecureHash'];
  //   // delete vnpParams['vnp_SecureHashType'];
  //   // const sortedParams = this.sortObject(vnpParams);
  //   // const { vnp_TmnCode, secretKey } = this.configService.get('vnp_HashSecret');
  //   // const signData = querystring.stringify(sortedParams, { encode: false });
  //   // const hmac = crypto.createHmac('sha512', secretKey);
  //   // const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  //   // if (vnp_SecureHash === signed) {
  //   //   // Kiểm tra dữ liệu trong cơ sở dữ liệu có hợp lệ hay không và thông báo kết quả
  //   //   return { code: vnp_ResponseCode };
  //   // } else {
  //   //   return { code: '97' };
  //   // }
  // }
}
