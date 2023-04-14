import {
  IsValidArrayNumber,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../common/decorators/custom-validator.decorator';
import { Language } from '../../common/enums/lang.enum';

export class CreateBoardingHouseRuleReqDto {
  @IsValidText({ trim: true, required: true })
  content: string;

  @IsValidEnum({ enum: Language, required: true })
  lang: Language;
}
export class UpdateBoardingHouseRuleReqDto {
  @IsValidNumber()
  id: number;

  @IsValidText({ trim: true, required: false })
  content?: string;

  @IsValidEnum({ enum: Language, required: false })
  lang?: Language;
}
export class DeleteListReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
