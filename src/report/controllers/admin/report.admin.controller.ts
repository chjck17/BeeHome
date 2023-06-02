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
  AuthenticateAdmin,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { ReportAdminService } from 'src/report/services/admin/report.admin.service';
import {
  DeleteListReportReqDto,
  GetListReportsReqDto,
} from 'src/report/dtos/reportreq.dto';
import { UpdateStatusAdminReportReqDto } from 'src/report/dtos/admin/report-status.admin.req.dto';

@Controller(`${PrefixType.ADMIN}/report`)
@AuthenticateAdmin()
@ApiTags('Report Admin')
export class ReportAdminController {
  constructor(private readonly reportAdminService: ReportAdminService) {}

  @Get()
  findAll(@CurrentUser() user: User, @Query() query: GetListReportsReqDto) {
    return this.reportAdminService.getListReport(user, query);
  }
  @Patch('status')
  updateStatus(
    @CurrentUser() user: User,
    @Body() dto: UpdateStatusAdminReportReqDto,
  ) {
    return this.reportAdminService.updateStatus(user, dto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportAdminService.findOne(Number(id));
  }

  // @Post()
  // createReport(@Body() createReportDto: CreateReportReqDto) {
  //   return this.reportAdminService.createReport(createReportDto);
  // }

  // @Patch(':id')
  // update(
  //   @CurrentUser() user: User,
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateReportReqDto,
  // ) {
  //   return this.reportAdminService.updateReport(
  //     user,
  //     Number(id),
  //     updateProductDto,
  //   );
  // }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.reportAdminService.deleteReport(user, Number(id));
  }

  @Delete()
  deleteListCategory(
    @CurrentUser() user: User,
    @Body() body: DeleteListReportReqDto,
  ) {
    return this.reportAdminService.deleteListReport(body, user);
  }
}
