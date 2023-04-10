import { Module } from '@nestjs/common';
import { ProvinceCustomerController } from './controllers/customer/province.customer.controller';
import { ProvinceRepository } from './repositories/province.repository';
import { ProvinceCustomerService } from './services/customer/province.customer.service';
import { Province } from './entities/province.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  controllers: [ProvinceCustomerController],
  providers: [ProvinceCustomerService, ProvinceRepository],
  exports: [],
})
export class ProvinceModule {}
