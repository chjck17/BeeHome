import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { ProvinceType } from '../../../enums/province.enum';

export class GetListProvinceReqDto {
  @IsValidNumber({ required: false, min: 1 })
  page?: number = 1;

  @IsValidNumber({ required: false, min: 1, max: 100 })
  limit?: number = 70;
  @IsValidEnum({ enum: ProvinceType, required: true })
  type: ProvinceType;
  @IsValidNumber({ required: false, min: 1 })
  parentId?: number;
  @IsValidText({ required: false })
  searchText?: string;
}

export class GetData {
  @IsValidText({ required: false })
  province?: string;

  @IsValidText({ required: false })
  district?: string;

  @IsValidText({ required: false })
  ward?: string;
}
