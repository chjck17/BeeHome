import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { In, IsNull } from 'typeorm';
import { ReportRepository } from '../../repositories/report.repository';
import { User } from '../../../auth/entities/user.entity';

import {
  BadRequestExc,
  NotFoundExc,
} from '../../../common/exceptions/custom.exception';
import { TypeORMQueryResult } from '../../../common/dtos/sql-query-result.dto';
import { UpdateStatusAdminReportReqDto } from '../../dtos/admin/report-status.admin.req.dto';
import {
  DeleteListReportReqDto,
  GetListReportsReqDto,
} from 'src/report/dtos/reportreq.dto';

@Injectable()
export class ReportAdminService {
  constructor(private reportRepo: ReportRepository) {}
  async findOne(reportId: number) {
    const report = await this.reportRepo.findOne({
      where: { id: reportId },
      relations: { boardingHouse: true },
    });
    return report;
  }

  async getListReport(user: User, dto: GetListReportsReqDto) {
    const { limit, page } = dto;
    const queryBuilder = this.reportRepo.createQueryBuilder('report');

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });
    const reports = await Promise.all(
      items.map(async (item) => {
        const report = await this.reportRepo.findOne({
          where: { id: item.id },
          relations: { boardingHouse: true },
        });
        return report;
      }),
    );
    return new Pagination(reports, meta);
  }
  async updateStatus(user: User, dto: UpdateStatusAdminReportReqDto) {
    const { status, reportId } = dto;

    const { affected } = await this.reportRepo.update(
      { id: reportId, deletedAt: IsNull() },
      { status },
    );

    if (affected < 1) throw new NotFoundExc('Admin not found');
  }

  async deleteReport(user: User, id: number) {
    const product = await this.reportRepo.findOneOrThrowNotFoundExc({
      where: { id, userId: user.id },
    });
    if (product) {
      await this.reportRepo.softDelete(id);
    }
  }

  async deleteListReport(
    dto: DeleteListReportReqDto,
    user: User,
  ): Promise<TypeORMQueryResult> {
    const { ids } = dto;

    const result = await this.reportRepo.softDelete({
      id: In(ids),
      userId: user.id,
    });

    if (result.affected !== ids.length) throw new BadRequestExc('common');

    return result;
  }
}
