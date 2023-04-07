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
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateLessor,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { TagLessorService } from '../../services/tag.service';
import {
  CreateTagReqDto,
  DeleteListTagReqDto,
  GetListTagsReqDto,
  UpdateTagReqDto,
} from '../../dtos/tag.req.dto';

@Controller(`${PrefixType.LESSOR}/tag`)
@AuthenticateLessor()
@ApiTags('Tag Lessor')
export class TagLessorController {
  constructor(private readonly tagLessorService: TagLessorService) {}

  @Get()
  findAll(@CurrentUser() user: User, @Query() query: GetListTagsReqDto) {
    return this.tagLessorService.getListTag(user, query);
  }

  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.tagLessorService.findOne(user, Number(id));
  }

  @Post()
  createTag(@CurrentUser() user: User, @Body() createTagDto: CreateTagReqDto) {
    return this.tagLessorService.createTag(user, createTagDto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateTagReqDto,
  ) {
    return this.tagLessorService.updateTag(user, Number(id), updateProductDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.tagLessorService.deleteTag(user, Number(id));
  }

  @Delete()
  deleteListCategory(
    @CurrentUser() user: User,
    @Body() body: DeleteListTagReqDto,
  ) {
    return this.tagLessorService.deleteListTag(body, user);
  }
}
