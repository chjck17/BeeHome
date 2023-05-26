import { ForbiddenError, defineAbility } from '@casl/ability';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { StrategyName } from '../../auth/constants/index.constant';
import { ABILITY_METADATA_KEY } from '../../common/constants/global.constant';
import { IS_PUBLIC_KEY } from '../../common/decorators/auth.decorator';
import { ForbiddenExc } from '../../common/exceptions/custom.exception';
import { PacketRequiredRule } from '../../common/interfaces/casl.interface';
import { User } from 'src/auth/entities/user.entity';
import { PacketAbilityFactory } from '../packet-ability.factory';

@Injectable()
export class JwtPacketLessorGuard extends AuthGuard(
  StrategyName.JWT_LESSOR_PACK,
) {
  constructor(
    private reflector: Reflector,
    private abilityFactory: PacketAbilityFactory,
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

    const rules = this.reflector.getAllAndOverride<PacketRequiredRule[]>(
      ABILITY_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rules?.length) return true;

    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: User,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (info instanceof Error || !user || err) throw new ForbiddenExc('common');

    const rules = this.reflector.getAllAndOverride<PacketRequiredRule[]>(
      ABILITY_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    // const isAgent = user.lessor;
    // if (!isAgent) return user as any;

    const ability = this.abilityFactory.defineAbility(user);
    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(
          rule.packType,
          rule.resourcePack,
        );
      });
      return user as any;
    } catch (error) {
      throw new ForbiddenExc(error.message);
    }
  }
}
