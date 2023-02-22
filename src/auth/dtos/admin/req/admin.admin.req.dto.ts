import {
  IsValidArrayString,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { AdminStatus } from '../../../enums/admin.enum';

export class ListAdminReqDto extends PaginationReqDto {
  @IsValidText({ trim: true, required: false })
  searchText?: string;

  @IsValidEnum({ enum: AdminStatus, required: false })
  status?: AdminStatus;
}

export class CreateAdminReqDto {
  @IsValidText()
  username: string;

  @IsValidText()
  password: string;

  @IsValidArrayString({ required: true, minSize: 1, unique: true })
  groupPolicyKeys: string[];
}

export class UpdateAdminReqDto {
  @IsValidNumber({ required: true, min: 1 })
  adminId: number;

  @IsValidEnum({ enum: AdminStatus, required: true })
  status: AdminStatus;

  @IsValidArrayString({ required: true, minSize: 1, unique: true })
  groupPolicyKeys: string[];
}
