import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import { Authorize } from '../../../common/decorators/auth.decorator';
import { PaginationResponse } from '../../../common/decorators/pagination-response.decorator';
import { DeleteMultipleByIdNumberReqDto } from '../../../common/dtos/delete-multiple.dto';
import { Action, Resource } from '../../../common/enums/casl.enum';
import {
  ListLessorAdminReqDto,
  UpdateStatusLessorAdminReqDto,
} from '../../dtos/admin/req/lessor.admin.req.dto';
import { LessorResDto } from '../../dtos/common/res/lessor.res.dto';
import { LessorAdminService } from '../../services/admin/merchant.admin.service';

@Controller(`${PrefixType.ADMIN}/merchant`)
@ApiTags('Manage Lessor')
@Authorize({ action: Action.MANAGE, resource: Resource.MERCHANT })
export class LessorAdminController {
  constructor(private merchantAdminService: LessorAdminService) {}

  @Get()
  @PaginationResponse(LessorResDto)
  getList(@Query() body: ListLessorAdminReqDto) {
    return this.merchantAdminService.getList(body);
  }

  @Get(':id')
  getDetail(@Param('id') id: number) {
    return this.merchantAdminService.getDetail(id);
  }

  @Patch('status')
  updateStatus(@Body() dto: UpdateStatusLessorAdminReqDto) {
    return this.merchantAdminService.updateStatus(dto);
  }

  @Delete()
  deleteList(@Body() body: DeleteMultipleByIdNumberReqDto) {
    return this.merchantAdminService.deleteList(body);
  }

  @Delete(':id')
  deleteSingle(@Param('id') id: number) {
    return this.merchantAdminService.deleteSingle(id);
  }
}
