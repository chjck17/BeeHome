import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CsvExportService } from './export.service';
import { join } from 'path';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvExportService: CsvExportService) {}

  @Get('export')
  async exportCsv(@Res() res: Response) {
    // const data = [
    //   { name: 'John', age: 25, email: 'john@example.com' },
    //   { name: 'Jane', age: 30, email: 'jane@example.com' },
    //   // Add more data as needed
    // ];

    // const headers = ['name', 'age', 'email'];
    // const filename = 'export.csv';

    // const filePath = await this.csvExportService.exportCsv(
    //   data,
    //   headers,
    //   filename,
    // );
    // return join(process.cwd(), './');
    // res.download(join(process.cwd(), './'), 'export');
    const filePath = join(process.cwd(), '../export');
    console.log(filePath);

    res.download(filePath, 'export.csv', (err) => {
      if (err) {
        // Handle the error
        console.error(err);
      } else {
        // File download complete
        console.log('File downloaded successfully');
      }
    });
  }
}
