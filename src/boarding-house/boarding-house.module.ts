import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardingHouse } from './entities/boarding-house.entity';
import { BoardingHouseRepository } from './repositories/boarding-house.repository';
import { BoardingHouseLessorController } from './controllers/lessor/boarding-house.lessor.controller';
import { BoardingHouseLessorService } from './services/lessor/boarding-house.lessor.service';
import { BoardingHouseAddressRepository } from './repositories/boarding-house-address.repository';
import { FloorRepository } from '../floor/repositories/floor.repository';
import { BoardingHouseRentDepositRepository } from './repositories/boarding-house-rent-deposits.repository';
import { BoardingHouseRuleRepository } from './repositories/boarding-house-rule.repository';
import { BoardingHouseAddress } from './entities/boarding-house-address.entity';
import { BoardingHouseRule } from './entities/boarding-house-rule.entity';
import { BoardingHouseRentDeposit } from './entities/boarding-house-rent-deposit.entity';
import { BoardingHouseCustomerService } from './services/customer/boarding-house.customer.service';
import { BoardingHouseCustomerController } from './controllers/customer/boarding-house.customer.controller';
import { BoardingHouseToTagRuleRepository } from './repositories/boarding-house-to-tag.repository';
import { BoardingHouseToTag } from './entities/boarding-house-to-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardingHouse,
      BoardingHouseAddress,
      BoardingHouseRule,
      BoardingHouseRentDeposit,
      BoardingHouseToTag,
    ]),
  ],
  controllers: [BoardingHouseLessorController, BoardingHouseCustomerController],
  providers: [
    BoardingHouseRepository,
    BoardingHouseLessorService,
    BoardingHouseRuleRepository,
    BoardingHouseRentDepositRepository,
    FloorRepository,
    BoardingHouseCustomerService,
    BoardingHouseAddressRepository,
    BoardingHouseToTagRuleRepository,
  ],
})
export class BoardingHouseModule {}
