import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/repositories/user.repository';
import { CaslAbilityFactory } from './casl-ability.factory';
import { GroupPolicyRepository } from './repositories/group-policies.repository';
import { GroupToPolicyRepository } from './repositories/group-to-policies.repository';
import { PolicyRepository } from './repositories/policy.repository';
import { UserToGroupPolicyRepository } from './repositories/user-to-group-policies.repository';
import { CaslTaskService } from './services/task/casl.task.service';
import { GroupPolicy } from './entities/group-policies.entity';
import { GroupToPolicy } from './entities/group-to-policy.entity';
import { Policy } from './entities/policies.entity';
import { UserToGroupPolicy } from './entities/user-to-group-policies.entity';
import { JwtCaslLessorStrategy } from './strategies/jwt-casl.lessor.strategy';
import { JwtCaslAdminStrategy } from './strategies/jwt-casl.admin.strategy';
import { CaslCommonService } from './services/common/casl.common.service';
import { CaslAdminController } from './controllers/casl.admin.controller';
import { CaslAdminService } from './services/admin/casl.admin.service';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupPolicy,
      GroupToPolicy,
      Policy,
      UserToGroupPolicy,
    ]),
  ],
  controllers: [CaslAdminController],
  providers: [
    CaslCommonService,
    CaslAdminService,
    CaslAbilityFactory,
    JwtCaslAdminStrategy,
    JwtCaslLessorStrategy,
    CaslTaskService,
    UserRepository,
    GroupPolicyRepository,
    GroupToPolicyRepository,
    PolicyRepository,
    UserToGroupPolicyRepository,
  ],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
