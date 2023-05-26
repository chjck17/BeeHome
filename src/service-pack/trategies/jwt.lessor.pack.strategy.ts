import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GlobalConfig } from 'src/common/config/global.config';
import { StrategyName } from '../../auth/constants/index.constant';
import { User } from '../../auth/entities/user.entity';
import { JwtAuthPayload } from '../../auth/interfaces/jwt-payload.interface';
import { ServicePackLessorService } from '../services/service-pack.lessor.service';

@Injectable()
export class JwtCaslLessorStrategy extends PassportStrategy(
  Strategy,
  StrategyName.JWT_LESSOR_PACK,
) {
  constructor(
    private servicePackLessorService: ServicePackLessorService,
    configService: ConfigService<GlobalConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.accessToken.secret'),
      algorithms: [configService.get('auth.accessToken.algorithm')],
    });
  }

  async validate(payload: JwtAuthPayload) {
    const pack = await this.servicePackLessorService.getPack(payload.userId);

    if (!pack.user) return false;

    // const userWithPolicies = plainToInstance(UserWithPoliciesDto, pack);

    // if (!userWithPolicies) return false;

    return pack;
  }
}
