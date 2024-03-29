import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ABILITY_METADATA_KEY } from 'src/common/constants/global.constant';
import { IS_PUBLIC_KEY } from '../../common/decorators/auth.decorator';
import { RequiredRule } from '../../common/interfaces/casl.interface';
import { StrategyName } from '../constants/index.constant';

@Injectable()
export class JwtAuthenManagerGuard extends AuthGuard(StrategyName.MANAGER) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    //  If route has rules, meaning it has authorization, so we don't need to authenticate again
    const rules = this.reflector.getAllAndOverride<RequiredRule[]>(
      ABILITY_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (rules) return true;

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }
}
