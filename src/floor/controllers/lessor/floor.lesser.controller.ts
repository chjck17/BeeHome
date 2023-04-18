import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateLessor,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';

import { ApiTags } from '@nestjs/swagger';
import { GetListFloorsReqDto } from '../../dtos/lessor/floor.req.dto';
import { FloorLessorService } from '../../services/floor.lessor.service';

@Controller(`${PrefixType.LESSOR}/floor`)
@AuthenticateLessor()
@ApiTags('Floor Lessor')
export class FloorLessorController {
  constructor(private readonly floorLessorService: FloorLessorService) {}

  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.floorLessorService.findOne(Number(id));
  }
}
