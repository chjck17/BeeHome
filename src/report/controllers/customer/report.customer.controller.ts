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
import { ReportCustomerService } from '../../services/customer/report.service';
import {
  CreateReportReqDto,
  DeleteListReportReqDto,
} from 'src/report/dtos/reportreq.dto';

@Controller(`${PrefixType.CUSTOMER}/report`)
@AuthenticateCustomer()
@ApiTags('Report Customer')
export class ReportCustomerController {
  constructor(private readonly reportCustomerService: ReportCustomerService) {}

  @Post()
  createReport(
    @Body() createReportDto: CreateReportReqDto,
    @CurrentUser() user: User,
  ) {
    return this.reportCustomerService.createReport(createReportDto, user);
  }

  // @Delete(':id')
  // remove(@CurrentUser() user: User, @Param('id') id: string) {
  //   return this.reportCustomerService.deleteReport(user, Number(id));
  // }

  // @Delete()
  // deleteListCategory(
  //   @CurrentUser() user: User,
  //   @Body() body: DeleteListReportReqDto,
  // ) {
  //   return this.reportCustomerService.deleteListReport(body, user);
  // }
}
