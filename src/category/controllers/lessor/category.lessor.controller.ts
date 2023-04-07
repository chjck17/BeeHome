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

import { CategoryLessorService } from '../../services/lessor/category.lessor.service';
import {
  CreateCategoryReqDto,
  DeleteCategoriesReqDto,
  GetListCategoryReqDto,
  UpdateCategoryReqDto,
} from '../../dtos/lessor/req/category.lessor.req.dto';

@Controller(`${PrefixType.LESSOR}/category`)
@AuthenticateLessor()
@ApiTags('Category Lessor')
export class CategoryLessorController {
  constructor(private readonly categoryLessorService: CategoryLessorService) {}

  @Get()
  get(@CurrentUser() user: User, @Query() query: GetListCategoryReqDto) {
    return this.categoryLessorService.getListCategory(user, query);
  }

  @Get(':id')
  getOne(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.categoryLessorService.getOne(user, id);
  }

  @Post()
  @AuthenticateLessor()
  create(
    @CurrentUser() user: User,
    @Body() createCategoryDto: CreateCategoryReqDto,
  ) {
    return this.categoryLessorService.create(user, createCategoryDto);
  }

  @Patch()
  @AuthenticateLessor()
  update(
    @CurrentUser() user: User,
    @Body() updateProductDto: UpdateCategoryReqDto,
  ) {
    return this.categoryLessorService.update(user, updateProductDto);
  }

  @Delete(':id')
  delete(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.categoryLessorService.deleteCategory(user, Number(id));
  }

  @Delete()
  deleteCategories(
    @CurrentUser() user: User,
    @Body() body: DeleteCategoriesReqDto,
  ) {
    return this.categoryLessorService.deleteCategories(user, body);
  }
}
