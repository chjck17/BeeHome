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
import { BoardingHouseDescriptionRepository } from './repositories/boarding-house-description.repository';
import { BoardingHouseDescription } from './entities/boarding-house-description.entity';
import { BoardingHouseCommonService } from './services/common/boardingHouse.common.service';
import { RoomRepository } from '../room/repositories/room.repository';
import { BoardingHouseImageRepository } from './repositories/boarding-house-img.repository';
import { BoardingHouseImage } from './entities/boarding-house-img.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardingHouse,
      BoardingHouseAddress,
      BoardingHouseRule,
      BoardingHouseRentDeposit,
      BoardingHouseToTag,
      BoardingHouseDescription,
      BoardingHouseImage,
    ]),
  ],
  controllers: [BoardingHouseLessorController, BoardingHouseCustomerController],
  providers: [
    BoardingHouseRepository,
    RoomRepository,
    BoardingHouseLessorService,
    BoardingHouseRuleRepository,
    BoardingHouseDescriptionRepository,
    BoardingHouseRentDepositRepository,
    FloorRepository,
    BoardingHouseCustomerService,
    BoardingHouseAddressRepository,
    BoardingHouseToTagRuleRepository,
    BoardingHouseCommonService,
    BoardingHouseImageRepository,
  ],
})
export class BoardingHouseModule {}
