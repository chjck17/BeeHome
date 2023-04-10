import {
    IsValidEnum,
    IsValidNumber,
    IsValidText
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { ProvinceType } from '../../../enums/province.enum';

export class GetListProvinceReqDto extends PaginationReqDto {
  @IsValidEnum({ enum: ProvinceType, required: true })
  type: ProvinceType;
  @IsValidNumber({ required: false, min: 1 })
  parentId?: number;
  @IsValidText({ required: false })
  searchText?: string;
}
