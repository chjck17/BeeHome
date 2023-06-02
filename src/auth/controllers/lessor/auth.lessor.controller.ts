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
  AuthenticateLessor,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { RefreshTokenReqDto } from '../../dtos/common/req/auth.req.dto';
import {
  LessorLoginReqDto,
  LessorRegisterReqDto,
  RegisterLessorReqDto,
} from '../../dtos/lessor/req/auth.lessor.req.dto';
import { User } from '../../entities/user.entity';
import { AuthLessorService } from '../../services/lessor/auth.lessor.service';

@Controller(`${PrefixType.LESSOR}/auth`)
@ApiTags('Auth Lessor')
export class AuthLessorController {
  constructor(private authLessorService: AuthLessorService) {}

  @Post('login')
  login(@Body() body: LessorLoginReqDto) {
    return this.authLessorService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterLessorReqDto) {
    return this.authLessorService.register(body);
  }

  @Get('current')
  @AuthenticateLessor()
  getCurrent(@CurrentUser() user: User) {
    return this.authLessorService.getCurrent(user);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenReqDto) {
    return this.authLessorService.refreshToken(body);
  }

  @Get('verify/:userId/:token')
  async verify(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('token') token: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    // const redirectUrl = await this.authLessorService.handleVerification(
    //   userId,
    //   token,
    // );
    // return res.redirect(redirectUrl);
  }
}
