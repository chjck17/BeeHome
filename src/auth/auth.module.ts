import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Manager } from './entities/manager.entity';
import { Merchant } from './entities/merchant.entity';
import { Admin } from './entities/admin.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from 'src/utils/utils.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalConfig } from 'src/common/config/global.config';
import { AuthMerchantController } from './controllers/merchant/auth.merchant.controller';
import { AuthAdminController } from './controllers/admin/auth.admin.controller';
import { AuthCustomerController } from './controllers/customer/auth.customer.controller';
import { AdminAdminController } from './controllers/admin/admin.admin.controller';
import { MerchantAdminController } from './controllers/admin/merchant.admin.controller';
import { CustomerAdminController } from './controllers/admin/customer.admin.controller';
import { ProfileMerchantController } from './controllers/merchant/profile.merchant.controller';
import { ProfileAdminController } from './controllers/admin/profile.admin.controller';
import { ProfileCustomerController } from './controllers/customer/profile.customer.controller';
import { AuthAdminService } from './services/admin/auth.admin.service';
import { AuthMerchantService } from './services/merchant/auth.merchant.service';
import { AuthCustomerService } from './services/customer/auth.customer.service';
import { AdminAdminService } from './services/admin/admin.admin.service';
import { MerchantAdminService } from './services/admin/merchant.admin.service';
import { CustomerAdminService } from './services/admin/customer.admin.service';
import { ProfileMerchantService } from './services/merchant/profile.merchant.service';
import { ProfileAdminService } from './services/admin/profile.admin.service';
import { ProfileCustomerService } from './services/customer/profile.customer.service';
import { AuthCommonService } from './services/common/auth.common.service';
import { JwtAuthenMerchantStrategy } from './strategies/jwt-authen.merchant.strategy';
import { JwtAuthenAdminStrategy } from './strategies/jwt-authen.admin.strategy';
import { JwtAuthenCustomerStrategy } from './strategies/jwt-authen.customer.strategy';
import { JwtAuthenUserStrategy } from './strategies/jwt-authen.user.strategy';
import { MerchantRepository } from './repositories/merchant.repository';
import { UserRepository } from './repositories/user.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { AdminRepository } from './repositories/admin.repository';
import { UserTokenRepository } from './repositories/user-token.repository';
import { GroupPolicyRepository } from 'src/casl/repositories/group-policies.repository';
import { UserToGroupPolicyRepository } from 'src/casl/repositories/user-to-group-policies.repository';
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
    TypeOrmModule.forFeature([Admin, Merchant, Manager, Customer]),
  ],
  controllers: [
    AuthMerchantController,
    AuthAdminController,
    AuthCustomerController,
    AdminAdminController,
    MerchantAdminController,
    CustomerAdminController,
    ProfileMerchantController,
    ProfileAdminController,
    ProfileCustomerController,
  ],
  providers: [
    AuthAdminService,
    AuthMerchantService,
    AuthCustomerService,
    AdminAdminService,
    MerchantAdminService,
    CustomerAdminService,
    ProfileMerchantService,
    ProfileAdminService,
    ProfileCustomerService,
    AuthCommonService,
    ConfigService,
    JwtAuthenMerchantStrategy,
    JwtAuthenAdminStrategy,
    JwtAuthenCustomerStrategy,
    JwtAuthenUserStrategy,
    MerchantRepository,
    UserRepository,
    CustomerRepository,
    AdminRepository,
    UserTokenRepository,
    GroupPolicyRepository,
    UserToGroupPolicyRepository,
  ],
})
export class AuthModule {
  constructor(private configService: ConfigService<GlobalConfig>) {}
}
