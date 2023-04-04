import { ForbiddenError } from '@casl/ability';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ABILITY_METADATA_KEY } from 'src/common/constants/global.constant';
import { StrategyName } from '../../auth/constants/index.constant';
import { IS_PUBLIC_KEY } from '../../common/decorators/auth.decorator';
import { ForbiddenExc } from '../../common/exceptions/custom.exception';
import { RequiredRule } from '../../common/interfaces/casl.interface';
import { UserWithPoliciesDto } from '../dtos/transform/userWithPolicies.dto';

@Injectable()
export class JwtAbilityAdminGuard extends AuthGuard(
  StrategyName.JWT_CASL_ADMIN,
) {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const rules = this.reflector.getAllAndOverride<RequiredRule[]>(
      ABILITY_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rules?.length) return true;

    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: UserWithPoliciesDto,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (info instanceof Error || !user || err) throw new ForbiddenExc('common');

    const rules = this.reflector.getAllAndOverride<RequiredRule[]>(
      ABILITY_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    const ability = this.abilityFactory.defineAbility(user);

    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.resource);
      });
      return user as any;
    } catch (error) {
      throw new ForbiddenExc(error.message);
    }
  }
}
