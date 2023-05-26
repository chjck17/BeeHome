import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GlobalConfig } from 'src/common/config/global.config';
import { StrategyName } from '../../auth/constants/index.constant';
import { User } from '../../auth/entities/user.entity';
import { JwtAuthPayload } from '../../auth/interfaces/jwt-payload.interface';
import { UserWithPoliciesDto } from '../dtos/transform/userWithPolicies.dto';
import { CaslCommonService } from '../services/common/casl.common.service';

@Injectable()
export class JwtCaslLessorStrategy extends PassportStrategy(
  Strategy,
  StrategyName.JWT_CASL_LESSOR,
) {
  constructor(
    private caslCommonService: CaslCommonService,
    configService: ConfigService<GlobalConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.accessToken.secret'),
      algorithms: [configService.get('auth.accessToken.algorithm')],
    });
  }

  async validate(
    payload: JwtAuthPayload,
  ): Promise<UserWithPoliciesDto | false> {
    const user: User = await this.caslCommonService.getLessorUserWithPolicies(
      payload.userId,
    );

    if (!user.lessor) return false;

    const userWithPolicies = plainToInstance(UserWithPoliciesDto, user);

    if (!userWithPolicies) return false;

    return userWithPolicies;
  }
}
