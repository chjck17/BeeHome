import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportRepository extends BaseRepository<Report> {
  constructor(dataSource: DataSource) {
    super(Report, dataSource);
  }
}
