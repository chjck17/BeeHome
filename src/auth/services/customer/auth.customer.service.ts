import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import firebase from 'firebase-admin';
import { GlobalConfig } from '../../../common/config/global.config';

import { Transactional } from 'typeorm-transactional';
import {
  ConflictExc,
  ExpectationFailedExc,
  UnauthorizedExc,
} from '../../../common/exceptions/custom.exception';
import { EncryptService } from '../../../utils/services/encrypt.service';
import { RefreshTokenReqDto } from '../../dtos/common/req/auth.req.dto';
import { AuthTokenResDto } from '../../dtos/common/res/auth-token.res.dto';
import { CustomerResDto } from '../../dtos/common/res/customer.res.dto';
import {
  LoginCustomerReqDto,
  RegisterCustomerReqDto,
} from '../../dtos/customer/req/auth.customer.req.dto';
import { User } from '../../entities/user.entity';
import { UserType } from '../../enums/user.enum';
import { JwtAuthPayload } from '../../interfaces/jwt-payload.interface';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MerchantRepository } from '../../repositories/merchant.repository';
import { UserRepository } from '../../repositories/user.repository';
import { AuthCommonService } from '../common/auth.common.service';

@Injectable()
export class AuthCustomerService {
  constructor(
    private customerRepo: CustomerRepository,
    private userRepo: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService<GlobalConfig>,
    private encryptService: EncryptService,
    private authCommonService: AuthCommonService,
    private merchantRepo: MerchantRepository,
  ) {}

  async getCurrent(user: User) {
    const customer = await this.customerRepo.findOneOrThrowNotFoundExc({
      where: { userId: user.id },
      relations: {
        // avatar: true
      },
    });

    return CustomerResDto.forCustomer(customer);
  }

  async login(dto: LoginCustomerReqDto) {
    const { password, phoneNumber } = dto;

    // const merchant = await this.merchantRepo.findOneOrThrowNotFoundExc({
    //   where: { id: merchantId },
    // });

    const customer = await this.customerRepo.findOne({
      where: {
        phoneNumber,
        // , merchantUserId: merchant.userId
      },
    });

    if (!customer) throw new UnauthorizedExc('Invalid credentials');
    if (!this.encryptService.compareHash(password, customer.password))
      throw new UnauthorizedExc('Invalid credentials');

    const payload: JwtAuthPayload = { userId: customer.userId };
    const accessToken = this.authCommonService.generateAccessToken(payload);
    const refreshToken = this.authCommonService.generateRefreshToken(payload);

    return AuthTokenResDto.forCustomer({ accessToken, refreshToken });
  }

  @Transactional()
  async register(dto: RegisterCustomerReqDto) {
    const { email, password, birthDate, firstName, lastName, phoneNumber } =
      dto;

    let customer = await this.customerRepo.findFirst({
      where: [
        {
          phoneNumber: dto.phoneNumber,
        },
      ],
    });
    if (customer) throw new ConflictExc('Phone number existed');

    const user = this.userRepo.create({ type: UserType.CUSTOMER });
    await this.userRepo.save(user);
    customer = this.customerRepo.create({
      userId: user.id,
      email,
      phoneNumber,
      birthDate,
      firstName,
      lastName,
      password: this.encryptService.encryptText(password),
    });
    await this.customerRepo.insert(customer);
    const payload: JwtAuthPayload = { userId: customer.userId };
    const accessToken = this.authCommonService.generateAccessToken(payload);
    const refreshToken = this.authCommonService.generateRefreshToken(payload);
    return AuthTokenResDto.forCustomer({ accessToken, refreshToken });
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

      return AuthTokenResDto.forCustomer({ accessToken });
    } catch (error) {
      throw new UnauthorizedExc('Invalid credentials');
    }
  }
}
