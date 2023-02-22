import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateAdmin,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { UpdateProfileAdminReqDto } from '../../dtos/admin/req/profile.admin.req.dto';
import { User } from '../../entities/user.entity';
import { ProfileAdminService } from '../../services/admin/profile.admin.service';

@Controller(`${PrefixType.ADMIN}/profile`)
@AuthenticateAdmin()
@ApiTags('Profile Admin')
export class ProfileAdminController {
  constructor(private profileAdminService: ProfileAdminService) {}

  @Get()
  getDetail(@CurrentUser() user: User) {
    return this.profileAdminService.getDetail(user);
  }

  @Put()
  update(@Body() body: UpdateProfileAdminReqDto, @CurrentUser() user: User) {
    return this.profileAdminService.update(body, user);
  }
}
