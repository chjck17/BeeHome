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
import { LessorResDto } from '../../dtos/common/res/lessor.res.dto';
import {
  LessorLoginReqDto,
  RegisterLessorReqDto,
} from '../../dtos/lessor/req/auth.lessor.req.dto';
import { User } from '../../entities/user.entity';
import { LessorStatus } from '../../enums/lessor.enum';
import { UserTokenType } from '../../enums/user-token.enum';
import { UserType } from '../../enums/user.enum';
import { JwtAuthPayload } from '../../interfaces/jwt-payload.interface';
import { LessorRepository } from '../../repositories/lessor.repository';
import { UserTokenRepository } from '../../repositories/user-token.repository';
import { UserRepository } from '../../repositories/user.repository';
import { AuthCommonService } from '../common/auth.common.service';

@Injectable()
export class AuthLessorService {
  constructor(
    private userRepo: UserRepository,
    private lessorRepo: LessorRepository,
    private jwtService: JwtService,
    // private emailService: EmailService,
    private userTokenRepo: UserTokenRepository,
    private encryptService: EncryptService,
    private authCommonService: AuthCommonService,
    private configService: ConfigService<GlobalConfig>,
  ) {}

  @Transactional()
  async register(dto: RegisterLessorReqDto) {
    const { email, password } = dto;

    const existedLessor = await this.lessorRepo.findOneBy({ email });
    if (existedLessor) throw new ConflictExc('Lessor existed');

    const user = await this.userRepo.save({ type: UserType.LESSOR });

    const lessor = this.lessorRepo.create({
      email,
      password: this.encryptService.encryptText(password),
      user,
      status: LessorStatus.UNVERIFIED,
    });

    await Promise.all([
      this.lessorRepo.save(lessor),
      // this.handleSendVerification(user.id, email),
    ]);

    return LessorResDto.forLessor(lessor);
  }

  async login(dto: LessorLoginReqDto) {
    const { email, password } = dto;
    const lessor = await this.lessorRepo
      .createQueryBuilder('lessor')
      .addSelect('lessor.password')
      .innerJoinAndSelect('lessor.user', 'user')
      .where('lessor.email = :email', { email })
      .andWhere('lessor.status = :status', {
        status: LessorStatus.APPROVED,
      })
      .getOne();

    if (!lessor) throw new UnauthorizedExc('Invalid Credentials');

    if (!bcrypt.compareSync(password, lessor.password))
      throw new UnauthorizedExc('Invalid Credentials');

    const payload: JwtAuthPayload = { userId: lessor.userId };
    const accessToken = this.authCommonService.generateAccessToken(payload);
    const refreshToken = this.authCommonService.generateRefreshToken(payload);

    return AuthTokenResDto.forLessor({ accessToken, refreshToken });
  }

  async getCurrent(user: User) {
    const lessor = await this.lessorRepo.findOneOrThrowNotFoundExc({
      where: { userId: user.id },
      // relations: { avatar: true },
    });

    return LessorResDto.forLessor(lessor);
  }

  // private async handleSendVerification(userId: number, email: string) {
  //   const token = nanoid(20);
  //   const serverDomain = this.configService.get('serverDomain');
  //   const expiresIn = this.configService.get(
  //     'auth.verification.tokenExpiresIn',
  //   );
  //   const verificationLink = `${serverDomain}/lessor/auth/verify/${userId}/${token}`;

  //   const userToken = this.userTokenRepo.create({
  //     userId,
  //     token,
  //     type: UserTokenType.VERIFICATION,
  //     expiresAt: dayjs().add(Number(expiresIn), 'second').toDate(),
  //   });
  //   await this.userTokenRepo.save(userToken);

  //   const emailInput: SendTemplatedEmailCommandInput = {
  //     Destination: { ToAddresses: [email] },
  //     Template: this.configService.get(
  //       'aws.ses.templateName.lessor.verifyEmailRequest',
  //     ),
  //     TemplateData: JSON.stringify({
  //       verificationLink,
  //       email,
  //     }),
  //   } as SendTemplatedEmailCommandInput;

  //   await this.emailService.sendTemplateEmail(emailInput);
  // }

  // @Transactional()
  // async handleVerification(userId: number, token: string) {
  //   const user = await this.userRepo.findOne({
  //     where: { id: userId },
  //     relations: { lessor: true },
  //   });
  //   const lessor = user?.lessor;

  //   if (!user || user.type !== UserType.LESSOR || !lessor)
  //     throw new NotFoundExc('Lessor not exist');

  //   if (lessor.status !== LessorStatus.UNVERIFIED)
  //     throw new ExpectationFailedExc(`Lessor don't need verified`);

  //   const userToken = await this.userTokenRepo.findOne({
  //     where: { userId, type: UserTokenType.VERIFICATION },
  //     order: { createdAt: 'DESC' },
  //   });

  //   if (!userToken || userToken.expiresAt < new Date())
  //     throw new ExpectationFailedExc('Token expires');

  //   if (userToken.token !== token) throw new BadRequestExc('Token invalid');

  //   const webLessorDomain = this.configService.get('webLessorDomain');
  //   const verifyLessorSuccessPath = this.configService.get(
  //     'auth.verification.verifySuccessPath',
  //   );
  //   const verifySuccessUrl = `${webLessorDomain}/${verifyLessorSuccessPath}`;

  //   await Promise.all([
  //     this.lessorRepo.update(lessor.id, {
  //       status: LessorStatus.VERIFIED,
  //     }),
  //     this.userTokenRepo.softDelete(userToken.id),
  //   ]);

  //   return verifySuccessUrl;
  // }

  async refreshToken(dto: RefreshTokenReqDto) {
    const { refreshToken } = dto;

    try {
      const payload = this.jwtService.verify<JwtAuthPayload>(refreshToken, {
        secret: this.configService.get('auth.refreshToken.secret'),
      });
      const accessToken = this.authCommonService.generateAccessToken({
        userId: payload.userId,
      });

      return AuthTokenResDto.forLessor({ accessToken });
    } catch (error) {
      throw new UnauthorizedExc('Invalid credentials');
    }
  }
}
