import { Injectable } from '@nestjs/common';

import { ReportRepository } from '../../repositories/report.repository';
import { User } from '../../../auth/entities/user.entity';

import { ConflictExc } from '../../../common/exceptions/custom.exception';

import { CreateReportReqDto } from 'src/report/dtos/reportreq.dto';
import { UserRepository } from 'src/auth/repositories/user.repository';

@Injectable()
export class ReportCustomerService {
  constructor(
    private reportRepo: ReportRepository,
    private userRepo: UserRepository,
  ) {}

  async createReport(reportDto: CreateReportReqDto, user: User) {
    const existReport = await this.userRepo.findOneOrThrowNotFoundExc({
      where: {
        id: user.id,
      },
      relations: { reports: true },
    });
    const reportList = existReport?.reports.filter(
      (item) => item.boardingHouseId === reportDto.boardingHouseId,
    );
    if (reportList.length >= 3) throw new ConflictExc('maximum report');

    const report = this.reportRepo.create({
      userId: user.id,
      boardingHouseId: reportDto.boardingHouseId,
      title: reportDto.title,
      dateReport: reportDto.dateReport,
    });
    await this.reportRepo.save(report);
    return report;
  }
}
