import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import {
    AuthenticateLessor,
    CurrentUser
} from '../../../common/decorators/auth.decorator';
import { UpdateProfileLessorReqDto } from '../../dtos/lessor/req/auth.lessor.req.dto';
import { User } from '../../entities/user.entity';
import { ProfileLessorService } from '../../services/lessor/profile.lessor.service';

@Controller(`${PrefixType.MERCHANT}/profile`)
@AuthenticateLessor()
@ApiTags('Profile Lessor')
export class ProfileLessorController {
  constructor(private profileLessorService: ProfileLessorService) {}

  @Get()
  getProfile(@CurrentUser() user: User) {
    return this.profileLessorService.get(user);
  }

  @Put()
  updateProfile(
    @Body() body: UpdateProfileLessorReqDto,
    @CurrentUser() user: User,
  ) {
    return this.profileLessorService.update(body, user);
  }
}
