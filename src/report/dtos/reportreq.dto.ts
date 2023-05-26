import { IsEmail } from 'class-validator';
import {
  IsValidArrayNumber,
  IsValidDate,
  IsValidNumber,
  IsValidText,
} from '../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../common/dtos/pagination.dto';

export class CreateReportReqDto {
  @IsValidNumber({ min: 1 })
  boardingHouseId: number;

  @IsValidText({ trim: true, required: true })
  title: string;

  @IsValidDate({ required: true })
  dateReport?: Date;
}
export class GetListReportsReqDto extends PaginationReqDto {}

export class UpdateReportReqDto {
  @IsValidText({ trim: true, required: false })
  name?: string;
  @IsValidText({ trim: true, required: false })
  slug?: string;
  @IsValidText({ trim: true, required: false })
  description?: string;
}
export class DeleteListReportReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
