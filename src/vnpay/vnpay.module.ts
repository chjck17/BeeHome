import { Module } from '@nestjs/common';
import { VNPayService } from './vnpayservice';
import { VNPayController } from './vnpay.controller';

@Module({
  providers: [VNPayService],
  controllers: [VNPayController],
})
export class VNPayModule {}
