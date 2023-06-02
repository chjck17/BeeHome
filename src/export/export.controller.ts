import { Controller, Get } from '@nestjs/common';
import { CsvExportService } from './export.service';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvExportService: CsvExportService) {}

  @Get('export')
  async exportCsv(): Promise<string> {
    const data = [
      { name: 'John', age: 25, email: 'john@example.com' },
      { name: 'Jane', age: 30, email: 'jane@example.com' },
      // Add more data as needed
    ];

    const headers = ['name', 'age', 'email'];
    const filename = 'export.csv';

    return await this.csvExportService.exportCsv(data, headers, filename);
  }
}
