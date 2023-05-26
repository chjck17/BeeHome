import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportRepository } from './repositories/report.repository';

import { Report } from './entities/report.entity';
import { ReportAdminService } from './services/admin/report.admin.service';
import { ReportAdminController } from './controllers/admin/report.admin.controller';
import { ReportCustomerController } from './controllers/customer/report.customer.controller';
import { ReportCustomerService } from './services/customer/report.service';

import { EmailConfirmationService } from '../emailConfirmation/emailConfirmation.service';
import { JwtService } from '@nestjs/jwt';
import EmailService from '../email/email.service';
import { UserRepository } from '../auth/repositories/user.repository';
import { CustomerRepository } from '../auth/repositories/customer.repository';
import { AdminRepository } from 'src/auth/repositories/admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportAdminController, ReportCustomerController],
  providers: [
    AdminRepository,
    CustomerRepository,
    UserRepository,
    ReportRepository,
    ReportAdminService,
    ReportCustomerService,
  ],
})
export class ReportModule {}
