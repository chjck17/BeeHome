import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardingHouse } from './entities/boarding-house.entity';
import { BoardingHouseRepository } from './repositories/boarding-house.repository';
import { BoardingHouseLessorController } from './controllers/lessor/boarding-house.lessor.controller';
import { BoardingHouseLessorService } from './services/lessor/boarding-house.lessor.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardingHouse])],
  controllers: [BoardingHouseLessorController],
  providers: [BoardingHouseRepository, BoardingHouseLessorService],
})
export class BoardingHouseModule {}
