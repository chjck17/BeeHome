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
  AuthenticateCustomer,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { BookCustomerService } from '../../services/customer/book.service';
import {
  CreateBookReqDto,
  DeleteListBookReqDto,
  GetListBooksReqDto,
  UpdateBookReqDto,
} from '../../dtos/book.req.dto';

@Controller(`${PrefixType.CUSTOMER}/book`)
// @AuthenticateCustomer()
@ApiTags('Book Customer')
export class BookCustomerController {
  constructor(private readonly bookCustomerService: BookCustomerService) {}

  // @Get()
  // findAll(@CurrentUser() user: User, @Query() query: GetListBooksReqDto) {
  //   return this.bookCustomerService.getListBook(user, query);
  // }

  // @Get(':id')
  // findOne(@CurrentUser() user: User, @Param('id') id: string) {
  //   return this.bookCustomerService.findOne(user, Number(id));
  // }

  @Post()
  createBook(@Body() createBookDto: CreateBookReqDto) {
    return this.bookCustomerService.createBook(createBookDto);
  }

  // @Patch(':id')
  // update(
  //   @CurrentUser() user: User,
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateBookReqDto,
  // ) {
  //   return this.bookCustomerService.updateBook(
  //     user,
  //     Number(id),
  //     updateProductDto,
  //   );
  // }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.bookCustomerService.deleteBook(user, Number(id));
  }

  @Delete()
  deleteListCategory(
    @CurrentUser() user: User,
    @Body() body: DeleteListBookReqDto,
  ) {
    return this.bookCustomerService.deleteListBook(body, user);
  }
}
