import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';

@Injectable()
export class CsvExportService {
  async exportCsv(
    data: any[],
    headers: string[],
    filename: string,
  ): Promise<string> {
    const csvWriter = createObjectCsvWriter({
      path: filename,
      header: headers.map((header) => ({ id: header, title: header })),
    });

    await csvWriter.writeRecords(data);

    return filename;
  }
}
