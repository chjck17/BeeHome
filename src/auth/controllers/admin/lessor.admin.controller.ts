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
import { AuthenticateAdmin, Authorize } from '../../../common/decorators/auth.decorator';
import { PaginationResponse } from '../../../common/decorators/pagination-response.decorator';
import { DeleteMultipleByIdNumberReqDto } from '../../../common/dtos/delete-multiple.dto';
import { Action, Resource } from '../../../common/enums/casl.enum';
import {
  ListLessorAdminReqDto,
  UpdateStatusLessorAdminReqDto,
} from '../../dtos/admin/req/lessor.admin.req.dto';
import { LessorResDto } from '../../dtos/common/res/lessor.res.dto';
import { LessorAdminService } from '../../services/admin/lessor.admin.service';

@Controller(`${PrefixType.ADMIN}/lessor`)
@ApiTags('Manage Lessor')
@AuthenticateAdmin()
// @Authorize({ action: Action.MANAGE, resource: Resource.LESSOR })
export class LessorAdminController {
  constructor(private lessorAdminService: LessorAdminService) {}

  @Get()
  @PaginationResponse(LessorResDto)
  getList(@Query() body: ListLessorAdminReqDto) {
    return this.lessorAdminService.getList(body);
  }

  @Get(':id')
  getDetail(@Param('id') id: number) {
    return this.lessorAdminService.getDetail(id);
  }

  @Patch('status')
  updateStatus(@Body() dto: UpdateStatusLessorAdminReqDto) {
    return this.lessorAdminService.updateStatus(dto);
  }

  @Delete()
  deleteList(@Body() body: DeleteMultipleByIdNumberReqDto) {
    return this.lessorAdminService.deleteList(body);
  }

  @Delete(':id')
  deleteSingle(@Param('id') id: number) {
    return this.lessorAdminService.deleteSingle(id);
  }
}
