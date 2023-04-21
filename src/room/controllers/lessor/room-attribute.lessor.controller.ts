import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateLessor,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';

import { RoomAttributeLessorService } from '../../services/lessor/room-attribute.lessor.service';
import {
  CreateRoomAttributeReqDto,
  GetListRoomAttributeReqDto,
  GetListRoomAttributeTermReqDto,
  UpdateRoomAttributeReqDto,
} from '../../dtos/lessor/req/room-attribute.lessor.req.dto';
import { DeleteListReqDto } from '../../dtos/lessor/req/room.req.dto';

@Controller(`${PrefixType.LESSOR}/roomAttribute`)
@AuthenticateLessor()
@ApiTags('RoomAttribute Lessor')
export class RoomAttributeLessorController {
  constructor(
    private readonly roomAttributeLessorService: RoomAttributeLessorService,
  ) {}

  @Get()
  get(@CurrentUser() user: User, @Query() query: GetListRoomAttributeReqDto) {
    return this.roomAttributeLessorService.getListRoomAttribute(user, query);
  }
  @Get('term')
  getTerm(
    @CurrentUser() user: User,
    @Query() query: GetListRoomAttributeTermReqDto,
  ) {
    return this.roomAttributeLessorService.getListRoomAttributeTerm(
      user,
      query,
    );
  }

  @Get(':id')
  getOne(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.roomAttributeLessorService.getOne(user, id);
  }

  @Post()
  @AuthenticateLessor()
  create(
    @CurrentUser() user: User,
    @Body() createRoomAttributeDto: CreateRoomAttributeReqDto,
  ) {
    return this.roomAttributeLessorService.create(user, createRoomAttributeDto);
  }

  @Patch()
  @AuthenticateLessor()
  update(
    @CurrentUser() user: User,
    @Body() updateProductDto: UpdateRoomAttributeReqDto,
  ) {
    return this.roomAttributeLessorService.update(user, updateProductDto);
  }

  @Delete(':id')
  delete(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.roomAttributeLessorService.deleteRoomAttribute(
      user,
      Number(id),
    );
  }

  @Delete()
  deleteRoomAttribute(
    @CurrentUser() user: User,
    @Body() body: DeleteListReqDto,
  ) {
    return this.roomAttributeLessorService.deleteRoomAttributes(user, body);
  }
}
