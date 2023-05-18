import { ApiProperty } from '@nestjs/swagger';
import {
  IsValidNumberString,
  IsValidText,
} from '../common/decorators/custom-validator.decorator';

export class PredictReqDto {
  @IsValidText()
  province: string;

  @IsValidText()
  district: string;

  @IsValidText()
  ward: string;

  @IsValidNumberString()
  acreage: string;

  @IsValidNumberString()
  toilet: string;

  @IsValidNumberString()
  room: string;
}
