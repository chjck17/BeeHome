import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvExportService } from './export.service';
import { CsvController } from './export.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CsvController],
  providers: [CsvExportService],
})
export class ExportModule {}
