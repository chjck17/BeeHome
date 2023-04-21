import {
  IsValidArrayNumber,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../common/dtos/pagination.dto';
import { Language } from '../../common/enums/lang.enum';
import { Status } from '../../common/enums/status.enum';
import { BoardingHouseType } from '../enums/type.enum';

export class CreateBoardingHouseDescriptionReqDto {
  @IsValidText({ trim: true, required: true })
  content: string;

  @IsValidEnum({ enum: Language, required: true })
  lang: Language;
}
export class UpdateBoardingHouseDescriptionReqDto {
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
