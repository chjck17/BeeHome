import {
  IsValidArrayString,
  IsValidNumber,
  IsValidNumberString,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class addCommentCustomerReqDto {
  @IsValidNumber()
  boardingHouseId: number;

  @IsValidText({ trim: true, required: true })
  content: string;

  @IsValidNumberString()
  star: string;
}
