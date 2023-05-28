// src/vnpay/vnpay.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateVnPay, CreateVnPayQue, SelectVnPay } from './vnpay.req.dto';
import { VNPayService } from './vnpayservice';
import {
  AuthenticateLessor,
  CurrentUser,
} from 'src/common/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';

@Controller('vn-pay')
@ApiTags('VN pay')
export class VNPayController {
  constructor(
    private readonly vnpayService: VNPayService,

    private readonly configService: ConfigService,
  ) {}

  @Post('create_payment_url')
  @AuthenticateLessor()
  async createVnPay(@Body() dto: CreateVnPay, @CurrentUser() user: User) {
    return this.vnpayService.createVnPay(dto, user);
  }

  @Get('vnpay_return')
  vnpayReturn(@Query() query: CreateVnPayQue) {
    return this.vnpayService.create(query);
  }

  @Get('vnpay_price')
  @AuthenticateLessor()
  vnpayPrice(@Query() dto: SelectVnPay, @CurrentUser() user: User) {
    return this.vnpayService.vnpayPrice(dto, user);
  }
}
