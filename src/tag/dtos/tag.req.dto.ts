import {
  IsValidArrayNumber,
  IsValidText,
} from '../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../common/dtos/pagination.dto';

export class CreateTagReqDto {
  @IsValidText({ trim: true, required: true })
  name: string;

  @IsValidText({ trim: true, required: true })
  slug: string;

  @IsValidText({ trim: true, required: true })
  description: string;
}
export class GetListTagsReqDto extends PaginationReqDto {}

export class UpdateTagReqDto {
  @IsValidText({ trim: true, required: false })
  name?: string;
  @IsValidText({ trim: true, required: false })
  slug?: string;
  @IsValidText({ trim: true, required: false })
  description?: string;
}
export class DeleteListTagReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
