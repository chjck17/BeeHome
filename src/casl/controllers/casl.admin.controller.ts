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
// import { User } from '../../auth/entities/user.entity';
// import { PrefixType } from '../../common/constants/global.constant';
// import {
//   AuthorizeAdmin,
//   CurrentUser,
// } from '../../common/decorators/auth.decorator';
// import { PaginationResponse } from '../../common/decorators/swagger.decorator';
// import { Action, Resource } from '../../common/enums/casl.enum';
// import {
//   CreateGroupPolicyAdminReqDto,
//   DeleteManyGroupPoliciesAdminReqDto,
//   GetListGroupPoliciesAdminReqDto,
//   GetListPoliciesAdminReqDto,
//   UpdateGroupPoliciesAdminReqDto,
// } from '../dtos/admin/req/casl.admin.req.dto';
// import { GroupPolicyResDto } from '../dtos/common/res/group-policies.res.dto';
// import { PolicyResDto } from '../dtos/common/res/policy.res.dto';
// import { CaslAdminService } from '../services/admin/casl.admin.service';

// @Controller(`${PrefixType.ADMIN}/casl`)
// @ApiTags('Casl Admin')
// @AuthorizeAdmin({ action: Action.READ, resource: Resource.GROUP_POLICY })
// export class CaslAdminController {
//   constructor(private caslAdminService: CaslAdminService) {}

//   @Get('policies')
//   @PaginationResponse(PolicyResDto)
//   getListPolicies(@Query() query: GetListPoliciesAdminReqDto) {
//     return this.caslAdminService.getListPolicies(query);
//   }

//   @Post('group-policy')
//   @AuthorizeAdmin({ action: Action.UPDATE, resource: Resource.GROUP_POLICY })
//   createGroupPolicies(
//     @Body() body: CreateGroupPolicyAdminReqDto,
//     @CurrentUser() user: User,
//   ) {
//     return this.caslAdminService.createGroupPolicy(body, user);
//   }

//   @Get('group-policy')
//   @PaginationResponse(GroupPolicyResDto)
//   getAllGroupPolicies(@Query() query: GetListGroupPoliciesAdminReqDto) {
//     return this.caslAdminService.getListGroupPolicies(query);
//   }

//   @Get('group-policy/:id')
//   getGroupPolicyById(@Param('id') id: number) {
//     return this.caslAdminService.getGroupPolicyById(id);
//   }

//   @Patch('group-policy')
//   @AuthorizeAdmin({ action: Action.UPDATE, resource: Resource.GROUP_POLICY })
//   updateGroupPolicies(
//     @Body() body: UpdateGroupPoliciesAdminReqDto,
//     @CurrentUser() user: User,
//   ) {
//     return this.caslAdminService.updateGroupPolicy(body, user);
//   }

//   @Delete('group-policy')
//   @AuthorizeAdmin({ action: Action.UPDATE, resource: Resource.GROUP_POLICY })
//   deleteManyGroupPolicies(@Body() body: DeleteManyGroupPoliciesAdminReqDto) {
//     return this.caslAdminService.deleteListGroupPolicies(body);
//   }

//   @Delete('group-policy/:id')
//   @AuthorizeAdmin({ action: Action.UPDATE, resource: Resource.GROUP_POLICY })
//   deleteGroupPolicies(@Param('id') id: number) {
//     return this.caslAdminService.deleteGroupPolicyById(id);
//   }
// }
