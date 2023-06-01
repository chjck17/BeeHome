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
import { AuthorizeAdmin } from '../../../common/decorators/auth.decorator';
import { PaginationResponse } from '../../../common/decorators/pagination-response.decorator';
import { DeleteMultipleByIdNumberReqDto } from '../../../common/dtos/delete-multiple.dto';
import { Action, Resource } from '../../../common/enums/casl.enum';
import {
  GetListCustomerAdminReqDto,
  UpdateCustomerAdminReqDto,
} from '../../dtos/admin/req/customer.admin.req.dto';
import { CustomerResDto } from '../../dtos/common/res/customer.res.dto';
import { CustomerAdminService } from '../../services/admin/customer.admin.service';

@Controller(`${PrefixType.ADMIN}/customer`)
@ApiTags('Manage Customer')
@AuthorizeAdmin({ action: Action.MANAGE, resource: Resource.CUSTOMER })
export class CustomerAdminController {
  constructor(private customerAdminService: CustomerAdminService) {}

  @Get()
  @PaginationResponse(CustomerResDto)
  getList(@Query() body: GetListCustomerAdminReqDto) {
    return this.customerAdminService.getList(body);
  }

  @Get(':id')
  getDetail(@Param('id') id: number) {
    return this.customerAdminService.getDetail(id);
  }

  @Patch('status')
  updateStatus(@Body() dto: UpdateCustomerAdminReqDto) {
    return this.customerAdminService.updateStatus(dto);
  }

  @Delete()
  deleteMultiple(@Body() body: DeleteMultipleByIdNumberReqDto) {
    return this.customerAdminService.deleteMultiple(body);
  }

  @Delete(':id')
  deleteSingle(@Param('id') id: number) {
    return this.customerAdminService.deleteSingle(id);
  }
}
