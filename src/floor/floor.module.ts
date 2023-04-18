import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from './entities/floor.entity';
import { FloorRepository } from './repositories/floor.repository';
import { FloorLessorController } from './controllers/lessor/floor.lesser.controller';
import { FloorLessorService } from './services/floor.lessor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Floor])],
  controllers: [FloorLessorController],
  providers: [FloorRepository, FloorLessorService],
})
export class FloorModule {}
