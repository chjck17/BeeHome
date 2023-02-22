import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeOrmCustomModule } from 'utility/dist';
import { UserRepository } from '../auth/repositories/user.repository';
import { CaslAbilityFactory } from './casl-ability.factory';
// import { CaslController } from './casl.controller';
// import { CaslService } from './casl.service';
import { GroupPolicyRepository } from './repositories/group-policies.repository';
import { GroupToPolicyRepository } from './repositories/group-to-policies.repository';
import { PolicyRepository } from './repositories/policy.repository';
import { UserToGroupPolicyRepository } from './repositories/user-to-group-policies.repository';
// import { JwtCaslStrategy } from './strategies/jwt-casl.strategy';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [, CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
