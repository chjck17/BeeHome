import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServicePack } from './entities/service-pack.entity';
import { ServicePackLessorController } from './controllers/lessor/service-pack.controller';
import { ServicePackRepository } from './repositories/service-pack.repository';
import { ServicePackLessorService } from './services/service-pack.lessor.service';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { LessorRepository } from 'src/auth/repositories/lessor.repository';
import { Lessor } from 'src/auth/entities/lessor.entity';
import { BillRepository } from 'src/vnpay/bill.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ServicePack, Lessor])],
  controllers: [ServicePackLessorController],
  providers: [
    ServicePackRepository,
    ServicePackLessorService,
    UserRepository,
    LessorRepository,
    BillRepository,
  ],
})
export class ServicePackModule {}
