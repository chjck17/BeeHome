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
import {
  DeleteListBookReqDto,
  GetListBooksReqDto,
} from '../../dtos/book.req.dto';

import { BookDisableLessorService } from '../../services/lessor/book-disable.lessor.service';
import { CreateBookDisableReqDto } from '../../dtos/lessor/book-disable.lessor.req.dto';

@Controller(`${PrefixType.LESSOR}/book-disable`)
@AuthenticateLessor()
@ApiTags('Book Lessor')
export class BookDisableLessorController {
  constructor(
    private readonly bookDisableLessorService: BookDisableLessorService,
  ) {}

  @Get()
  findAll(@CurrentUser() user: User, @Query() query: GetListBooksReqDto) {
    return this.bookDisableLessorService.getListBookDisable(user, query);
  }

  @Post()
  createBook(
    @Body() createBookDto: CreateBookDisableReqDto,
    @CurrentUser() user: User,
  ) {
    return this.bookDisableLessorService.createBookDisable(createBookDto, user);
  }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.bookDisableLessorService.deleteBook(user, Number(id));
  }

  @Delete()
  deleteListCategory(
    @CurrentUser() user: User,
    @Body() body: DeleteListBookReqDto,
  ) {
    return this.bookDisableLessorService.deleteListBook(body, user);
  }
}
