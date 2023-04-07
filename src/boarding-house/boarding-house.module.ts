import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardingHouse } from './entities/boarding-house.entity';
import { BoardingHouseRepository } from './repositories/boarding-house.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BoardingHouse])],
  controllers: [],
  providers: [BoardingHouseRepository],
})
export class BoardingHouseModule {}
