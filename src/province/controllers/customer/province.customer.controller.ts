import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import { GetListProvinceReqDto } from '../../dtos/customer/req/province.req.dto';
import { ProvinceCustomerService } from '../../services/customer/province.customer.service';

@Controller(`${PrefixType.CUSTOMER}/province`)
@ApiTags('Province Customer')
export class ProvinceCustomerController {
  constructor(private readonly provinceCustomerSer: ProvinceCustomerService) {}

  @Get()
  getList(@Query() query: GetListProvinceReqDto) {
    return this.provinceCustomerSer.getList(query);
  }
}
