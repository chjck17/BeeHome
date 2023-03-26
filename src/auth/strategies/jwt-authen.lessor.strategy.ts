import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GlobalConfig } from 'src/common/config/global.config';
import { StrategyName } from '../constants/index.constant';
import { LessorStatus } from '../enums/lessor.enum';
import { UserType } from '../enums/user.enum';
import { JwtAuthPayload } from '../interfaces/jwt-payload.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class JwtAuthenLessorStrategy extends PassportStrategy(
  Strategy,
  StrategyName.LESSOR,
) {
  constructor(
    private readonly userRepo: UserRepository,
    configService: ConfigService<GlobalConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: [configService.get('auth.accessToken.secret')],

      algorithms: [configService.get('auth.accessToken.algorithm')],
    });
  }

  async validate(payload: JwtAuthPayload) {
    const { userId } = payload;

    const user = await this.userRepo.findOne({
      where: {
        id: userId,
        type: UserType.LESSOR,
        lessor: { status: LessorStatus.APPROVED },
      },
      relations: { lessor: true },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
