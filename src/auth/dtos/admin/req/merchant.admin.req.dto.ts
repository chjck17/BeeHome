import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { MerchantRank, MerchantStatus } from '../../../enums/merchant.enum';

export class ListMerchantAdminReqDto extends PaginationReqDto {
  @IsValidEnum({ enum: MerchantStatus, required: false })
  status?: MerchantStatus;

  @IsValidEnum({ enum: MerchantRank, required: false })
  rank?: MerchantRank;

  @IsValidText({ required: false, trim: true })
  searchText?: string;
}

export class UpdateMerchantAdminReqDto {
  @IsValidNumber({ required: true, min: 1 })
  merchantId: number;

  @IsValidText({})
  name?: string;

  @IsValidEnum({ enum: MerchantStatus, required: false })
  status?: MerchantStatus;
}

export class UpdateStatusMerchantAdminReqDto {
  @IsValidNumber({ min: 1 })
  merchantId: number;

  @IsValidEnum({ enum: MerchantStatus })
  status: MerchantStatus;
}
