import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import VerificationTokenPayload from './verificationTokenPayload.interface';
import EmailService from '../email/email.service';
import { UserRepository } from '../auth/repositories/user.repository';
import { User } from '../auth/entities/user.entity';
import { CustomerRepository } from '../auth/repositories/customer.repository';
import { LessorRepository } from '../auth/repositories/lessor.repository';
// import { UsersService } from '../users/users.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly userRepo: UserRepository,
    private readonly customerRepo: CustomerRepository,
    private readonly lessorRepo: LessorRepository,
  ) {}

  public sendVerificationCustomerLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL_CUSTOMER',
    )}/${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    });
  }
  async markEmailAsConfirmed(user: User) {
    return this.userRepo.update(
      { id: user.id },
      {
        isEmailConfirmed: true,
      },
    );
  }
  // public async resendConfirmationLink(userId: string) {
  //   // const user = await this.userRepo.findOne({ where: { id: Number(userId) } });
  //   // if (user.isEmailConfirmed) {
  //   //   throw new BadRequestException('Email already confirmed');
  //   // }
  //   await this.sendVerificationLink(user.email);
  // }

  public async confirmEmail(email: string, type: string) {
    if (type === 'customer') {
      const customer = await this.customerRepo.findOne({
        where: { email: email },
        relations: { user: true },
      });
      if (customer.user.isEmailConfirmed) {
        throw new BadRequestException('Email already confirmed');
      }
      await this.markEmailAsConfirmed(customer.user);
    }
    if (type === 'lessor') {
      const lessor = await this.lessorRepo.findOne({
        where: { email: email },
        relations: { user: true },
      });
      if (lessor.user.isEmailConfirmed) {
        throw new BadRequestException('Email already confirmed');
      }
      await this.markEmailAsConfirmed(lessor.user);
    }
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
