import { Body, Controller, Get, Patch, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import {
    AuthenticateCustomer,
    CurrentUser
} from '../../../common/decorators/auth.decorator';
import {
    UpdateAvatarCustomerReqDto,
    UpdatePasswordCustomerReqDto,
    UpdateProfileCustomerReqDto
} from '../../dtos/customer/req/profile.customer.dto';
import { User } from '../../entities/user.entity';
import { ProfileCustomerService } from '../../services/customer/profile.customer.service';

@Controller(`${PrefixType.CUSTOMER}/profile`)
@AuthenticateCustomer()
@ApiTags('Profile Customer')
export class ProfileCustomerController {
  constructor(
    private readonly profileCustomerService: ProfileCustomerService,
  ) {}

  @Get()
  getInfo(@CurrentUser() user: User) {
    return this.profileCustomerService.getProfile(user);
  }

  @Put()
  updateInfo(
    @CurrentUser() user: User,
    @Body() body: UpdateProfileCustomerReqDto,
  ) {
    return this.profileCustomerService.updateProfile(user, body);
  }

  @Patch('avatar')
  updateAvatar(
    @Body() body: UpdateAvatarCustomerReqDto,
    @CurrentUser() user: User,
  ) {
    return this.profileCustomerService.updateAvatar(body, user);
  }

  @Patch('/update-password')
  updatepassword(
    @CurrentUser() user: User,
    @Body() body: UpdatePasswordCustomerReqDto,
  ) {
    return this.profileCustomerService.updatePassword(user, body);
  }
}
