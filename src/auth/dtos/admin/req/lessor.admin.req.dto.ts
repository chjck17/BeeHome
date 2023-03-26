import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { LessorRank, LessorStatus } from '../../../enums/lessor.enum';

export class ListLessorAdminReqDto extends PaginationReqDto {
  @IsValidEnum({ enum: LessorStatus, required: false })
  status?: LessorStatus;

  @IsValidEnum({ enum: LessorRank, required: false })
  rank?: LessorRank;

  @IsValidText({ required: false, trim: true })
  searchText?: string;
}

export class UpdateLessorAdminReqDto {
  @IsValidNumber({ required: true, min: 1 })
  lessorId: number;

  @IsValidText({})
  name?: string;

  @IsValidEnum({ enum: LessorStatus, required: false })
  status?: LessorStatus;
}

export class UpdateStatusLessorAdminReqDto {
  @IsValidNumber({ min: 1 })
  lessorId: number;

  @IsValidEnum({ enum: LessorStatus })
  status: LessorStatus;
}
