import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import {
    AuthenticateMerchant,
    CurrentUser
} from '../../../common/decorators/auth.decorator';
import { UpdateProfileMerchantReqDto } from '../../dtos/merchant/req/auth.merchant.req.dto';
import { User } from '../../entities/user.entity';
import { ProfileMerchantService } from '../../services/merchant/profile.merchant.service';

@Controller(`${PrefixType.MERCHANT}/profile`)
@AuthenticateMerchant()
@ApiTags('Profile Merchant')
export class ProfileMerchantController {
  constructor(private profileMerchantService: ProfileMerchantService) {}

  @Get()
  getProfile(@CurrentUser() user: User) {
    return this.profileMerchantService.get(user);
  }

  @Put()
  updateProfile(
    @Body() body: UpdateProfileMerchantReqDto,
    @CurrentUser() user: User,
  ) {
    return this.profileMerchantService.update(body, user);
  }
}
