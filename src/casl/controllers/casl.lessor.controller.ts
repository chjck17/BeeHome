// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   Query,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { User } from '../../auth/entities/user.entity';
// import { PrefixType } from '../../common/constants/global.constant';
// import { Action, Resource } from '../../common/enums/casl.enum';
// import { AuthorizeLessor } from '../../common/decorators/auth.decorator';

// // import {
// //   CreateGroupPolicyLessorReqDto,
// //   DeleteManyGroupPoliciesLessorReqDto,
// //   GetListGroupPoliciesLessorReqDto,
// //   GetListPoliciesLessorReqDto,
// //   UpdateGroupPolicyLessorReqDto,
// // } from '../dtos/merchant/req/casl.merchant.req.dto';

// @Controller(`${PrefixType.LESSOR}/casl`)
// @ApiTags('Casl Lessor')
// @AuthorizeLessor({ action: Action.READ, resource: Resource.GROUP_POLICY })
// export class CaslLessorController {
//   constructor(private caslLessorService: CaslLessorService) {}

//   // @Get('policies')
//   // getAllPolicies(@Query() query: GetListPoliciesLessorReqDto) {
//   //   return this.caslLessorService.getAllPolicies(query);
//   // }

//   // @Get('group-policy')
//   // getAllGroupPolicies(
//   //   @Query() query: GetListGroupPoliciesLessorReqDto,
//   //   @CurrentUser() user: User,
//   // ) {
//   //   return this.caslLessorService.getListGroupPolicies(query, user);
//   // }

//   @Get('group-policy/:id')
//   getGroupPolicyById(@Param('id') id: number, @CurrentUser() user: User) {
//     return this.caslLessorService.getDetail(id, user);
//   }

//   // @Post('group-policy')
//   // @AuthorizeLessor({ action: Action.CREATE, resource: Resource.GROUP_POLICY })
//   // createGroupPolicies(
//   //   @Body() body: CreateGroupPolicyLessorReqDto,
//   //   @CurrentUser() user: User,
//   // ) {
//   //   return this.caslLessorService.createGroupPolicy(body, user);
//   // }

//   // @Put('group-policy')
//   // @AuthorizeLessor({ action: Action.UPDATE, resource: Resource.GROUP_POLICY })
//   // updateGroupPolicies(
//   //   @Body() body: UpdateGroupPolicyLessorReqDto,
//   //   @CurrentUser() user: User,
//   // ) {
//   //   return this.caslLessorService.updateGroupPolicy(body, user);
//   // }

//   // @Delete('group-policy')
//   // @AuthorizeLessor({ action: Action.DELETE, resource: Resource.GROUP_POLICY })
//   // deleteListGroupPolicies(
//   //   @Body() body: DeleteManyGroupPoliciesLessorReqDto,
//   //   @CurrentUser() user: User,
//   // ) {
//   //   return this.caslLessorService.deleteListGroupPolicies(body, user);
//   // }

//   @Delete('group-policy/:id')
//   @AuthorizeLessor({ action: Action.DELETE, resource: Resource.GROUP_POLICY })
//   deleteGroupPolicyById(@Param('id') id: number, @CurrentUser() user: User) {
//     return this.caslLessorService.deleteGroupPolicyById(id, user);
//   }
// }
