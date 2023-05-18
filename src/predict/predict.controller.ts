import { Controller, Get, Query } from '@nestjs/common';
import { AuthenticateLessor } from '../common/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../common/constants/global.constant';
import { PythonShell } from 'python-shell';
import { PredictReqDto } from './predict.req.dto';

@Controller(`${PrefixType.LESSOR}/predict`)
@ApiTags('predict')
export class PredictBoardingHouseLessorController {
  constructor() {}

  @Get('predictions')
  async getPredictions(@Query() dto: PredictReqDto) {
    const { province, district, ward, acreage, toilet, room } = dto;
    const options = {
      scriptPath: './src/predict',
      args: [province, district, ward, acreage, toilet, room],
    };
    const pyShell = new PythonShell('your_python_script.py', options);
    const predictions: any[] = await new Promise((resolve, reject) => {
      pyShell.on('message', (message) => {
        resolve(JSON.parse(message));
      });
      pyShell.on('error', (error) => {
        reject(error);
      });
      pyShell.end((error, code, signal) => {
        if (error) {
          reject(error);
        }
      });
    });

    return { predictions };
  }
}
