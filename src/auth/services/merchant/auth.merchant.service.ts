// import { SendTemplatedEmailCommandInput } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { Transactional } from 'typeorm-transactional';
import { GlobalConfig } from '../../../common/config/global.config';
import {
  BadRequestExc,
  ConflictExc,
  ExpectationFailedExc,
  NotFoundExc,
  UnauthorizedExc,
} from '../../../common/exceptions/custom.exception';
// import { EmailService } from '../../../utils/services/email.service';
import { EncryptService } from '../../../utils/services/encrypt.service';
import { RefreshTokenReqDto } from '../../dtos/common/req/auth.req.dto';
import { AuthTokenResDto } from '../../dtos/common/res/auth-token.res.dto';
import { MerchantResDto } from '../../dtos/common/res/merchant.res.dto';
import {
  MerchantLoginReqDto,
  RegisterMerchantReqDto,
} from '../../dtos/merchant/req/auth.merchant.req.dto';
import { User } from '../../entities/user.entity';
import { MerchantStatus } from '../../enums/merchant.enum';
import { UserTokenType } from '../../enums/user-token.enum';
import { UserType } from '../../enums/user.enum';
import { JwtAuthPayload } from '../../interfaces/jwt-payload.interface';
import { MerchantRepository } from '../../repositories/merchant.repository';
import { UserTokenRepository } from '../../repositories/user-token.repository';
import { UserRepository } from '../../repositories/user.repository';
import { AuthCommonService } from '../common/auth.common.service';

@Injectable()
export class AuthMerchantService {
  constructor(
    private userRepo: UserRepository,
    private merchantRepo: MerchantRepository,
    private jwtService: JwtService,
    // private emailService: EmailService,
    private userTokenRepo: UserTokenRepository,
    private encryptService: EncryptService,
    private authCommonService: AuthCommonService,
    private configService: ConfigService<GlobalConfig>,
  ) {}

  @Transactional()
  async register(dto: RegisterMerchantReqDto) {
    const { email, password } = dto;

    const existedMerchant = await this.merchantRepo.findOneBy({ email });
    if (existedMerchant) throw new ConflictExc('Merchant existed');

    const user = await this.userRepo.save({ type: UserType.MERCHANT });

    const merchant = this.merchantRepo.create({
      email,
      password: this.encryptService.encryptText(password),
      user,
      status: MerchantStatus.UNVERIFIED,
    });

    await Promise.all([
      this.merchantRepo.save(merchant),
      // this.handleSendVerification(user.id, email),
    ]);

    return MerchantResDto.forMerchant(merchant);
  }

  async login(dto: MerchantLoginReqDto) {
    const { email, password } = dto;
    const merchant = await this.merchantRepo
      .createQueryBuilder('merchant')
      .addSelect('merchant.password')
      .innerJoinAndSelect('merchant.user', 'user')
      .where('merchant.email = :email', { email })
      .andWhere('merchant.status = :status', {
        status: MerchantStatus.APPROVED,
      })
      .getOne();

    if (!merchant) throw new UnauthorizedExc('Invalid Credentials');

    if (!bcrypt.compareSync(password, merchant.password))
      throw new UnauthorizedExc('Invalid Credentials');

    const payload: JwtAuthPayload = { userId: merchant.userId };
    const accessToken = this.authCommonService.generateAccessToken(payload);
    const refreshToken = this.authCommonService.generateRefreshToken(payload);

    return AuthTokenResDto.forMerchant({ accessToken, refreshToken });
  }

  async getCurrent(user: User) {
    const merchant = await this.merchantRepo.findOneOrThrowNotFoundExc({
      where: { userId: user.id },
      // relations: { avatar: true },
    });

    return MerchantResDto.forMerchant(merchant);
  }

  private async handleSendVerification(userId: number, email: string) {
    const token = nanoid(20);
    const serverDomain = this.configService.get('serverDomain');
    const expiresIn = this.configService.get(
      'auth.verification.tokenExpiresIn',
    );
    const verificationLink = `${serverDomain}/merchant/auth/verify/${userId}/${token}`;

    const userToken = this.userTokenRepo.create({
      userId,
      token,
      type: UserTokenType.VERIFICATION,
      expiresAt: dayjs().add(Number(expiresIn), 'second').toDate(),
    });
    await this.userTokenRepo.save(userToken);

    // const emailInput: SendTemplatedEmailCommandInput = {
    //   Destination: { ToAddresses: [email] },
    //   Template: this.configService.get(
    //     'aws.ses.templateName.merchant.verifyEmailRequest',
    //   ),
    //   TemplateData: JSON.stringify({
    //     verificationLink,
    //     email,
    //   }),
    // } as SendTemplatedEmailCommandInput;

    // await this.emailService.sendTemplateEmail(emailInput);
  }

  @Transactional()
  async handleVerification(userId: number, token: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: { merchant: true },
    });
    const merchant = user?.merchant;

    if (!user || user.type !== UserType.MERCHANT || !merchant)
      throw new NotFoundExc('Merchant not exist');

    if (merchant.status !== MerchantStatus.UNVERIFIED)
      throw new ExpectationFailedExc(`Merchant don't need verified`);

    const userToken = await this.userTokenRepo.findOne({
      where: { userId, type: UserTokenType.VERIFICATION },
      order: { createdAt: 'DESC' },
    });

    if (!userToken || userToken.expiresAt < new Date())
      throw new ExpectationFailedExc('Token expires');

    if (userToken.token !== token) throw new BadRequestExc('Token invalid');

    const webMerchantDomain = this.configService.get('webMerchantDomain');
    const verifyMerchantSuccessPath = this.configService.get(
      'auth.verification.verifySuccessPath',
    );
    const verifySuccessUrl = `${webMerchantDomain}/${verifyMerchantSuccessPath}`;

    await Promise.all([
      this.merchantRepo.update(merchant.id, {
        status: MerchantStatus.VERIFIED,
      }),
      this.userTokenRepo.softDelete(userToken.id),
    ]);

    return verifySuccessUrl;
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

      return AuthTokenResDto.forMerchant({ accessToken });
    } catch (error) {
      throw new UnauthorizedExc('Invalid credentials');
    }
  }
}
