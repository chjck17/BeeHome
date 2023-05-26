import { Body, Controller, Post, Get } from '@nestjs/common';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateLessor,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';

import { ServicePackLessorService } from 'src/service-pack/services/service-pack.lessor.service';
import { CreateServicePackReqDto } from 'src/service-pack/dtos/lessor/service-pack.lessor.req.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller(`${PrefixType.LESSOR}/service-pack`)
@AuthenticateLessor()
@ApiTags('ServicePack Lessor')
export class ServicePackLessorController {
  constructor(
    private readonly servicePackLessorService: ServicePackLessorService,
  ) {}
  @Post()
  createServicePack(
    @CurrentUser() user: User,
    @Body() dto: CreateServicePackReqDto,
  ) {
    return this.servicePackLessorService.createServicePack(dto, user);
  }

  // @Get(':id')
  // findOne(@CurrentUser() user: User, @Param('id') id: string) {
  //   return this.servicePackLessorService.findOne(user, Number(id));
  // }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.servicePackLessorService.getPack(user.id);
  }
}
