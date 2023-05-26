// src/vnpay/vnpay.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateVnPay, CreateVnPayQue } from './vnpay.req.dto';
import { VNPayService } from './vnpayservice';

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
    return this.vnpayService.createVnPay(dto);
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
