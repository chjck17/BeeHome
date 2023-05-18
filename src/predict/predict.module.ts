import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictBoardingHouseLessorController } from './predict.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PredictBoardingHouseLessorController],
  providers: [],
})
export class PredictBoardingHouseLessorModule {}
