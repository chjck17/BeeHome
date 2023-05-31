import { Module } from '@nestjs/common';
import { VNPayService } from './vnpayservice';
import { VNPayController } from './vnpay.controller';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { BillRepository } from './bill.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/bill/bill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  providers: [VNPayService, UserRepository, BillRepository],
  controllers: [VNPayController],
})
export class VNPayModule {}
