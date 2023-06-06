// src/vnpay/vnpay.controller.ts
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreateVnPay,
  CreateVnPayQue,
  GetListBillsReqDto,
  SelectVnPay,
} from './vnpay.req.dto';
import { VNPayService } from './vnpayservice';
import {
  AuthenticateAdmin,
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

  // @Get('vnpay_return')
  // vnpayReturn(@Query() query: CreateVnPayQue) {
  //   return this.vnpayService.create(query);
  // }

  @Get('vnpay_price')
  @AuthenticateLessor()
  vnpayPrice(@Query() dto: SelectVnPay, @CurrentUser() user: User) {
    return this.vnpayService.vnpayPrice(dto, user);
  }

  @Post('create_bill')
  @AuthenticateLessor()
  async createBill(@Body() dto: CreateVnPayQue, @CurrentUser() user: User) {
    return this.vnpayService.create(dto, user);
  }

  @Get()
  @AuthenticateLessor()
  findAll(@CurrentUser() user: User, @Query() query: GetListBillsReqDto) {
    return this.vnpayService.getListBill(user, query);
  }

  @Get(':id')
  @AuthenticateLessor()
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.vnpayService.findOne(user, Number(id));
  }

  @Get('graph')
  @AuthenticateAdmin()
  getGraph(@Query() query: GetListBillsReqDto) {
    return this.vnpayService.getGraph(query);
  }
}
