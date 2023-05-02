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
import { CommentCustomerService } from '../../services/customer/comment.service';
import {
  CreateCommentReqDto,
  DeleteListCommentReqDto,
  GetListCommentsReqDto,
  UpdateCommentReqDto,
} from '../../dtos/comment.req.dto';

@Controller(`${PrefixType.CUSTOMER}/comment`)
@ApiTags('Comment Customer')
export class CommentCustomerController {
  constructor(
    private readonly commentCustomerService: CommentCustomerService,
  ) {}

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.commentCustomerService.getListComment(Number(id));
  }

  // @Get(':id')
  // findOne(@CurrentUser() user: User, @Param('id') id: string) {
  //   return this.commentCustomerService.findOne(Number(id));
  // }

  @AuthenticateCustomer()
  @Post()
  createComment(
    @CurrentUser() user: User,
    @Body() createCommentDto: CreateCommentReqDto,
  ) {
    return this.commentCustomerService.createComment(user, createCommentDto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateCommentReqDto,
  ) {
    return this.commentCustomerService.updateComment(
      user,
      Number(id),
      updateProductDto,
    );
  }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.commentCustomerService.deleteComment(user, Number(id));
  }

  @Delete()
  deleteListCategory(
    @CurrentUser() user: User,
    @Body() body: DeleteListCommentReqDto,
  ) {
    return this.commentCustomerService.deleteListComment(body, user);
  }
}
