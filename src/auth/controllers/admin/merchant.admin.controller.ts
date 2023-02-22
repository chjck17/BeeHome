import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import { Authorize } from '../../../common/decorators/auth.decorator';
import { PaginationResponse } from '../../../common/decorators/pagination-response.decorator';
import { DeleteMultipleByIdNumberReqDto } from '../../../common/dtos/delete-multiple.dto';
import { Action, Resource } from '../../../common/enums/casl.enum';
import {
    ListMerchantAdminReqDto,
    UpdateStatusMerchantAdminReqDto
} from '../../dtos/admin/req/merchant.admin.req.dto';
import { MerchantResDto } from '../../dtos/common/res/merchant.res.dto';
import { MerchantAdminService } from '../../services/admin/merchant.admin.service';

@Controller(`${PrefixType.ADMIN}/merchant`)
@ApiTags('Manage Merchant')
@Authorize({ action: Action.MANAGE, resource: Resource.MERCHANT })
export class MerchantAdminController {
  constructor(private merchantAdminService: MerchantAdminService) {}

  @Get()
  @PaginationResponse(MerchantResDto)
  getList(@Query() body: ListMerchantAdminReqDto) {
    return this.merchantAdminService.getList(body);
  }

  @Get(':id')
  getDetail(@Param('id') id: number) {
    return this.merchantAdminService.getDetail(id);
  }

  @Patch('status')
  updateStatus(@Body() dto: UpdateStatusMerchantAdminReqDto) {
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
