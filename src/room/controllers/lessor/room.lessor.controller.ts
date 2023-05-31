import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateLessor,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { RoomLessorService } from '../../services/lessor/room.lessor.service';
import {
  CheckRoomNumberReqDto,
  CreateRoomReqDto,
  GetListRoomsReqDto,
  UpdateRoomReqDto,
} from '../../dtos/lessor/req/room.req.dto';
import { DeleteListReqDto } from '../../../boarding-house/dtos/boarding-house.req.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FastifyFileInterceptor } from '../../../upload-file/interceptor/fastify-file-interceptor';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../../utils/file-upload-util';
import { fileMapper, filesMapper } from '../../../utils/file-mapper';
import { Request } from 'express';
import { UploadFileService } from '../../../upload-file/upload-file.service';
import { FastifyFilesInterceptor } from '../../../upload-file/interceptor/fastify-files-interceptor';

@Controller(`${PrefixType.LESSOR}/room`)
@AuthenticateLessor()
@ApiTags('Room Lessor')
export class RoomLessorController {
  constructor(
    private readonly roomLessorService: RoomLessorService,
    private uploadFileService: UploadFileService,
  ) {}

  @Get()
  findAll(@CurrentUser() user: User, @Query() query: GetListRoomsReqDto) {
    return this.roomLessorService.getListRoom(user, query);
  }

  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.roomLessorService.findOne(user, Number(id));
  }

  @Post()
  @UseInterceptors(
    FastifyFilesInterceptor('photo_url', 10, {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createRoom(@Body() createRoomDto: CreateRoomReqDto) {
    return this.roomLessorService.createRoom(createRoomDto);
  }

  @Patch()
  update(
    @CurrentUser() user: User,
    @Body() updateProductDto: UpdateRoomReqDto,
  ) {
    return this.roomLessorService.updateRoom(updateProductDto);
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

  @Get('check-number-room')
  checkNumberRoom(
    @CurrentUser() user: User,
    // @Param('id') dto: CheckRoomNumberReqDto,
  ) {
    return this.roomLessorService.checkRoomNumber(user);
  }
}
