import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Manager } from './entities/manager.entity';
import { Lessor } from './entities/lessor.entity';
import { Admin } from './entities/admin.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from 'src/utils/utils.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalConfig } from 'src/common/config/global.config';
import { AuthLessorController } from './controllers/lessor/auth.lessor.controller';
import { AuthAdminController } from './controllers/admin/auth.admin.controller';
import { AuthCustomerController } from './controllers/customer/auth.customer.controller';
import { AdminAdminController } from './controllers/admin/admin.admin.controller';
import { LessorAdminController } from './controllers/admin/lessor.admin.controller';
import { CustomerAdminController } from './controllers/admin/customer.admin.controller';
import { ProfileLessorController } from './controllers/lessor/profile.lessor.controller';
import { ProfileAdminController } from './controllers/admin/profile.admin.controller';
import { ProfileCustomerController } from './controllers/customer/profile.customer.controller';
import { AuthAdminService } from './services/admin/auth.admin.service';
import { AuthLessorService } from './services/lessor/auth.lessor.service';
import { AuthCustomerService } from './services/customer/auth.customer.service';
import { AdminAdminService } from './services/admin/admin.admin.service';
import { LessorAdminService } from './services/admin/lessor.admin.service';
import { CustomerAdminService } from './services/admin/customer.admin.service';
import { ProfileLessorService } from './services/lessor/profile.lessor.service';
import { ProfileAdminService } from './services/admin/profile.admin.service';
import { ProfileCustomerService } from './services/customer/profile.customer.service';
import { AuthCommonService } from './services/common/auth.common.service';
import { JwtAuthenLessorStrategy } from './strategies/jwt-authen.lessor.strategy';
import { JwtAuthenAdminStrategy } from './strategies/jwt-authen.admin.strategy';
import { JwtAuthenCustomerStrategy } from './strategies/jwt-authen.customer.strategy';
import { JwtAuthenUserStrategy } from './strategies/jwt-authen.user.strategy';
import { LessorRepository } from './repositories/lessor.repository';
import { UserRepository } from './repositories/user.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { AdminRepository } from './repositories/admin.repository';
import { UserTokenRepository } from './repositories/user-token.repository';
import { GroupPolicyRepository } from 'src/casl/repositories/group-policies.repository';
import { UserToGroupPolicyRepository } from 'src/casl/repositories/user-to-group-policies.repository';
import { ManagerRepository } from './repositories/manager.repository';
import { EmailConfirmationService } from '../emailConfirmation/emailConfirmation.service';
import EmailService from '../email/email.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => ({
        secretOrKey: [configService.get('auth.accessToken.secret')],
        signOptions: {
          algorithm: configService.get('auth.accessToken.algorithm'),
        },
      }),
    }),
    UtilsModule,
    TypeOrmModule.forFeature([Admin, Lessor, Manager, Customer]),
  ],
  controllers: [
    AuthLessorController,
    AuthAdminController,
    AuthCustomerController,
    AdminAdminController,
    LessorAdminController,
    CustomerAdminController,
    ProfileLessorController,
    ProfileAdminController,
    ProfileCustomerController,
  ],
  providers: [
    AuthAdminService,
    AuthLessorService,
    AuthCustomerService,
    AdminAdminService,
    LessorAdminService,
    CustomerAdminService,
    ProfileLessorService,
    ProfileAdminService,
    ProfileCustomerService,
    AuthCommonService,
    ConfigService,
    JwtAuthenLessorStrategy,
    JwtAuthenAdminStrategy,
    JwtAuthenCustomerStrategy,
    JwtAuthenUserStrategy,
    LessorRepository,
    UserRepository,
    CustomerRepository,
    AdminRepository,
    ManagerRepository,
    UserTokenRepository,
    GroupPolicyRepository,
    UserToGroupPolicyRepository,
    EmailConfirmationService,
    EmailService,
  ],
})
export class AuthModule {
  constructor(private configService: ConfigService<GlobalConfig>) {}
}
