import {
  IsValidArrayNumber,
  IsValidNumber,
  IsValidNumberString,
  IsValidText,
} from '../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../common/dtos/pagination.dto';

export class CreateCommentReqDto {
  @IsValidNumber({ required: true, min: 0 })
  boardingHouseId: number;

  @IsValidText({ trim: true, required: true })
  content: string;

  @IsValidNumberString({ required: false })
  star?: string;
}
export class GetListCommentsReqDto extends PaginationReqDto {}

export class UpdateCommentReqDto {
  @IsValidText({ trim: true, required: false })
  content?: string;

  @IsValidNumberString({ required: false })
  star?: string;
}
export class DeleteListCommentReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
