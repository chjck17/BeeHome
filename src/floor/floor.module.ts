import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from './entities/floor.entity';
import { FloorRepository } from './repositories/floor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Floor])],
  controllers: [],
  providers: [FloorRepository],
})
export class FloorModule {}
