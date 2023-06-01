import { CustomerStatus } from 'src/auth/enums/customer.enum';
import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';

export enum SearchBy {
  PHONE = 'PHONE',
  LESSOR_NAME = 'LESSOR_NAME',
  EMAIL = 'EMAIL',
}

export class GetListCustomerAdminReqDto extends PaginationReqDto {
  @IsValidEnum({ enum: SearchBy, required: false })
  searchBy?: SearchBy;

  @IsValidText({ required: false, trim: true })
  searchText?: string;
}

export class UpdateCustomerAdminReqDto {
  @IsValidNumber({ required: true, min: 1 })
  lessorId: number;

  @IsValidText({})
  name?: string;

  @IsValidEnum({ enum: CustomerStatus, required: false })
  status?: CustomerStatus;
}
