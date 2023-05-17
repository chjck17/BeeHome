import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GlobalConfig } from '../../../common/config/global.config';
import { UnauthorizedExc } from '../../../common/exceptions/custom.exception';
import { EncryptService } from '../../../utils/services/encrypt.service';
import { AdminLoginReqDto } from '../../dtos/admin/req/auth.admin.req.dto';
import { RefreshTokenReqDto } from '../../dtos/common/req/auth.req.dto';
import { AuthTokenResDto } from '../../dtos/common/res/auth-token.res.dto';
import { UserResDto } from '../../dtos/common/res/user.res.dto';
import { User } from '../../entities/user.entity';
import { JwtAuthPayload } from '../../interfaces/jwt-payload.interface';
import { AdminRepository } from '../../repositories/admin.repository';
import { AuthCommonService } from '../common/auth.common.service';

@Injectable()
export class AuthAdminService {
  constructor(
    private adminRepo: AdminRepository,
    private encryptService: EncryptService,
    private jwtService: JwtService,
    private configService: ConfigService<GlobalConfig>,
    private authCommonService: AuthCommonService,
  ) {}

  async login(dto: AdminLoginReqDto) {
    const { email, password } = dto;
    // return this.encryptService.encryptText(password);
    const admin = await this.adminRepo
      .createQueryBuilder('admin')
      .addSelect('admin.password')
      .innerJoinAndSelect('admin.user', 'user')
      .where('admin.username = :username', { username: email })
      .getOne();
    if (!admin) throw new UnauthorizedExc();

    if (!this.encryptService.compareHash(password, admin.password))
      throw new UnauthorizedExc();

    const payload: JwtAuthPayload = { userId: admin.userId };
    const accessToken = this.authCommonService.generateAccessToken(payload);
    const refreshToken = this.authCommonService.generateRefreshToken(payload);

    return AuthTokenResDto.forAdmin({ accessToken, refreshToken });
  }

  async getCurrent(user: User) {
    return UserResDto.forAdmin(user);
  }

  async refreshToken(dto: RefreshTokenReqDto) {
    const { refreshToken } = dto;

    try {
      const payload = this.jwtService.verify<JwtAuthPayload>(refreshToken, {
        secret: this.configService.get('auth.refreshToken.secret'),
      });
      const accessToken = this.authCommonService.generateAccessToken({
        userId: payload.userId,
      });

      return AuthTokenResDto.forAdmin({ accessToken });
    } catch (error) {
      throw new UnauthorizedExc('Invalid credentials');
    }
  }
}
