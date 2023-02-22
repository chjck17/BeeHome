import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateMerchant,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { RefreshTokenReqDto } from '../../dtos/common/req/auth.req.dto';
import {
  MerchantLoginReqDto,
  MerchantRegisterReqDto,
} from '../../dtos/merchant/req/auth.merchant.req.dto';
import { User } from '../../entities/user.entity';
import { AuthMerchantService } from '../../services/merchant/auth.merchant.service';

@Controller(`${PrefixType.MERCHANT}/auth`)
@ApiTags('Auth Merchant')
export class AuthMerchantController {
  constructor(private authMerchantService: AuthMerchantService) {}

  @Post('login')
  login(@Body() body: MerchantLoginReqDto) {
    return this.authMerchantService.login(body);
  }

  @Post('register')
  register(@Body() body: MerchantRegisterReqDto) {
    return this.authMerchantService.register(body);
  }

  @Get('current')
  @AuthenticateMerchant()
  getCurrent(@CurrentUser() user: User) {
    return this.authMerchantService.getCurrent(user);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenReqDto) {
    return this.authMerchantService.refreshToken(body);
  }

  @Get('verify/:userId/:token')
  async verify(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('token') token: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const redirectUrl = await this.authMerchantService.handleVerification(
      userId,
      token,
    );
    return res.redirect(redirectUrl);
  }
}
