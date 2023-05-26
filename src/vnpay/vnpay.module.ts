import { Module } from '@nestjs/common';
import { VNPayService } from './vnpayservice';
import { VNPayController } from './vnpay.controller';
import { UserRepository } from 'src/auth/repositories/user.repository';

@Module({
  providers: [VNPayService, UserRepository],
  controllers: [VNPayController],
})
export class VNPayModule {}
