import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Get,
} from '@nestjs/common';
import ConfirmEmailDto from './confirmEmail.dto';
import { EmailConfirmationService } from './emailConfirmation.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('email-confirmation')
@ApiTags('Email confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('confirm-customer/:token')
  async confirmCustomer(@Param('token') token: string) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      token,
    );
    await this.emailConfirmationService.confirmEmail(email, 'customer');
    return email;
  }

  @Get('confirm-booking-date/:token')
  async confirmBookingCustomer(@Param('token') token: string) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      token,
    );
    await this.emailConfirmationService.confirmBooking(email, 'customer');
    return email;
  }

  @Get('confirm-lessor/:token')
  async confirmLessor(@Param('token') token: string) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      token,
    );
    await this.emailConfirmationService.confirmEmail(email, 'lessor');
    return email;
  }

  @Post('resend-confirmation-link')
  // @UseGuards(JwtAuthenticationGuard)
  async resendConfirmationLink() {
    // @Req() request: RequestWithUser
    // await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  }
}
