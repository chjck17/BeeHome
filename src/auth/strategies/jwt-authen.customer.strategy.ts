import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GlobalConfig } from 'src/common/config/global.config';
import { StrategyName } from '../constants/index.constant';
import { UserType } from '../enums/user.enum';
import { JwtAuthPayload } from '../interfaces/jwt-payload.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class JwtAuthenCustomerStrategy extends PassportStrategy(
  Strategy,
  StrategyName.CUSTOMER,
) {
  constructor(
    private readonly userRepo: UserRepository,
    configService: ConfigService<GlobalConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'sss',

      algorithms: [configService.get('auth.accessToken.algorithm')],
    });
  }

  async validate(payload: JwtAuthPayload) {
    const { userId } = payload;
    const user = await this.userRepo.findOne({
      where: { id: userId, type: UserType.CUSTOMER },
      relations: { customer: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
