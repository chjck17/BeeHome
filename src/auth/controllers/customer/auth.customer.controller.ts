import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateCustomer,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { RefreshTokenReqDto } from '../../dtos/common/req/auth.req.dto';
import {
  LoginCustomerReqDto,
  RegisterCustomerReqDto,
} from '../../dtos/customer/req/auth.customer.req.dto';
import { User } from '../../entities/user.entity';
import { AuthCustomerService } from '../../services/customer/auth.customer.service';

@Controller(`${PrefixType.CUSTOMER}/auth`)
@ApiTags('Auth Customer')
export class AuthCustomerController {
  constructor(private authCustomerService: AuthCustomerService) {}

  @Post('register')
  register(@Body() body: RegisterCustomerReqDto) {
    return this.authCustomerService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginCustomerReqDto) {
    return this.authCustomerService.login(body);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenReqDto) {
    return this.authCustomerService.refreshToken(body);
  }

  @Get('current')
  @AuthenticateCustomer()
  getCurrent(@CurrentUser() user: User) {
    return this.authCustomerService.getCurrent(user);
  }
}
