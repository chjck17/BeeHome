// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   Query,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { User } from '../../../auth/entities/user.entity';
// import { PrefixType } from '../../../common/constants/global.constant';
// import {
//   AuthenticateLessor,
//   CurrentUser,
// } from '../../../common/decorators/auth.decorator';
// import { CommentLessorService } from '../../services/customer/comment.service';
// import {
//   CreateCommentReqDto,
//   DeleteListCommentReqDto,
//   GetListCommentsReqDto,
//   UpdateCommentReqDto,
// } from '../../dtos/comment.req.dto';

// @Controller(`${PrefixType.LESSOR}/comment`)
// @AuthenticateLessor()
// @ApiTags('Comment Lessor')
// export class CommentLessorController {
//   constructor(private readonly commentLessorService: CommentLessorService) {}

//   @Get()
//   findAll(@CurrentUser() user: User, @Query() query: GetListCommentsReqDto) {
//     return this.commentLessorService.getListComment(user, query);
//   }

//   @Get(':id')
//   findOne(@CurrentUser() user: User, @Param('id') id: string) {
//     return this.commentLessorService.findOne(user, Number(id));
//   }

//   @Post()
//   createComment(
//     @CurrentUser() user: User,
//     @Body() createCommentDto: CreateCommentReqDto,
//   ) {
//     return this.commentLessorService.createComment(user, createCommentDto);
//   }

//   @Patch(':id')
//   update(
//     @CurrentUser() user: User,
//     @Param('id') id: string,
//     @Body() updateProductDto: UpdateCommentReqDto,
//   ) {
//     return this.commentLessorService.updateComment(
//       user,
//       Number(id),
//       updateProductDto,
//     );
//   }

//   @Delete(':id')
//   remove(@CurrentUser() user: User, @Param('id') id: string) {
//     return this.commentLessorService.deleteComment(user, Number(id));
//   }

//   @Delete()
//   deleteListCategory(
//     @CurrentUser() user: User,
//     @Body() body: DeleteListCommentReqDto,
//   ) {
//     return this.commentLessorService.deleteListComment(body, user);
//   }
// }
