import {
  IsValidEnum,
  IsValidNumber,
} from 'src/common/decorators/custom-validator.decorator';
import { AdminBoardingHouseStatus, Status } from 'src/common/enums/status.enum';

export class UpdateBoardingHouseStatusReqDto {
  @IsValidNumber()
  id: number;

  @IsValidEnum({ enum: AdminBoardingHouseStatus, required: false })
  adminStatus?: AdminBoardingHouseStatus;
}
