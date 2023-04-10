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
import { RoomLessorService } from '../../services/lessor/room.lessor.service';
import {
  CreateRoomReqDto,
  GetListRoomsReqDto,
  UpdateRoomReqDto,
} from '../../dtos/lessor/req/room.req.dto';
import { DeleteListReqDto } from '../../../boarding-house/dtos/boarding-house.req.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller(`${PrefixType.LESSOR}/room`)
@AuthenticateLessor()
@ApiTags('Room Lessor')
export class RoomLessorController {
  constructor(private readonly roomLessorService: RoomLessorService) {}

  @Get()
  findAll(@CurrentUser() user: User, @Query() query: GetListRoomsReqDto) {
    return this.roomLessorService.getListRoom(user, query);
  }

  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.roomLessorService.findOne(user, Number(id));
  }

  @Post()
  createRoom(
    @CurrentUser() user: User,
    @Body() createRoomDto: CreateRoomReqDto,
  ) {
    return this.roomLessorService.createRoom(user, createRoomDto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateRoomReqDto,
  ) {
    return this.roomLessorService.updateRoom(
      user,
      Number(id),
      updateProductDto,
    );
  }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.roomLessorService.deleteRoom(user, Number(id));
  }

  @Delete()
  deleteListCategory(
    @CurrentUser() user: User,
    @Body() body: DeleteListReqDto,
  ) {
    return this.roomLessorService.deleteListRoom(body, user);
  }
}
