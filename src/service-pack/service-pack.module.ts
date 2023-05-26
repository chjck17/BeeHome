import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServicePack } from './entities/service-pack.entity';
import { ServicePackLessorController } from './controllers/lessor/service-pack.controller';
import { ServicePackRepository } from './repositories/service-pack.repository';
import { ServicePackLessorService } from './services/service-pack.lessor.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServicePack])],
  controllers: [ServicePackLessorController],
  providers: [ServicePackRepository, ServicePackLessorService],
})
export class ServicePackModule {}
