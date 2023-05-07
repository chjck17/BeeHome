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
  CreateBookReqDto,
  DeleteListBookReqDto,
  GetListBooksReqDto,
} from '../../dtos/book.req.dto';
import { BookLessorService } from '../../services/lessor/book.lessor.service';
import { UpdateStatusLessorBookReqDto } from '../../dtos/lessor/book-status.lessor.req.dto';

@Controller(`${PrefixType.LESSOR}/book`)
@AuthenticateLessor()
@ApiTags('Book Lessor')
export class BookLessorController {
  constructor(private readonly bookLessorService: BookLessorService) {}

  @Get()
  findAll(@CurrentUser() user: User, @Query() query: GetListBooksReqDto) {
    return this.bookLessorService.getListBook(user, query);
  }
  @Patch('status')
  updateStatus(
    @CurrentUser() user: User,
    @Body() dto: UpdateStatusLessorBookReqDto,
  ) {
    return this.bookLessorService.updateStatus(user, dto);
  }
  // @Get(':id')
  // findOne(@CurrentUser() user: User, @Param('id') id: string) {
  //   return this.bookLessorService.findOne(user, Number(id));
  // }

  // @Post()
  // createBook(@Body() createBookDto: CreateBookReqDto) {
  //   return this.bookLessorService.createBook(createBookDto);
  // }

  // @Patch(':id')
  // update(
  //   @CurrentUser() user: User,
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateBookReqDto,
  // ) {
  //   return this.bookLessorService.updateBook(
  //     user,
  //     Number(id),
  //     updateProductDto,
  //   );
  // }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.bookLessorService.deleteBook(user, Number(id));
  }

  @Delete()
  deleteListCategory(
    @CurrentUser() user: User,
    @Body() body: DeleteListBookReqDto,
  ) {
    return this.bookLessorService.deleteListBook(body, user);
  }
}
