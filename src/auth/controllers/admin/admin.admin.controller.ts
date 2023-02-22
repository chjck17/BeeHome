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
import { PrefixType } from '../../../common/constants/global.constant';
import { Authorize } from '../../../common/decorators/auth.decorator';
import { PaginationResponse } from '../../../common/decorators/pagination-response.decorator';
import { DeleteMultipleByIdNumberReqDto } from '../../../common/dtos/delete-multiple.dto';
import { Action, Resource } from '../../../common/enums/casl.enum';
import {
  CreateAdminReqDto,
  ListAdminReqDto,
  UpdateAdminReqDto,
} from '../../dtos/admin/req/admin.admin.req.dto';
import { AdminResDto } from '../../dtos/common/res/admin.res.dto';
import { AdminAdminService } from '../../services/admin/admin.admin.service';

@Controller(`${PrefixType.ADMIN}/admin`)
@ApiTags('Manage Admin')
@Authorize({ action: Action.MANAGE, resource: Resource.ADMIN })
export class AdminAdminController {
  constructor(private adminAdminService: AdminAdminService) {}

  @Get()
  @PaginationResponse(AdminResDto)
  getListAdmin(@Query() body: ListAdminReqDto) {
    return this.adminAdminService.getList(body);
  }

  @Get(':id')
  getAdminDetail(@Param('id') id: number) {
    return this.adminAdminService.getDetail(id);
  }

  @Post()
  create(@Body() body: CreateAdminReqDto) {
    return this.adminAdminService.create(body);
  }

  @Patch()
  update(@Body() body: UpdateAdminReqDto) {
    return this.adminAdminService.update(body);
  }

  @Delete()
  deleteListAdmin(@Body() body: DeleteMultipleByIdNumberReqDto) {
    return this.adminAdminService.deleteList(body);
  }

  @Delete(':id')
  deleteAdminById(@Param('id') id: number) {
    return this.adminAdminService.deleteSingle(id);
  }
}
