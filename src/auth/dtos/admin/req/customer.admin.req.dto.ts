import {
  IsValidEnum,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';

export enum SearchBy {
  PHONE = 'PHONE',
  MERCHANT_NAME = 'MERCHANT_NAME',
  EMAIL = 'EMAIL',
}

export class GetListCustomerAdminReqDto extends PaginationReqDto {
  @IsValidEnum({ enum: SearchBy, required: false })
  searchBy?: SearchBy;

  @IsValidText({ required: false, trim: true })
  searchText?: string;
}
