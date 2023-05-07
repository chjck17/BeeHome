// export class ListLessorAdminReqDto extends PaginationReqDto {
//   @IsValidEnum({ enum: LessorStatus, required: false })
//   status?: LessorStatus;

import {
  IsValidEnum,
  IsValidNumber,
} from '../../../common/decorators/custom-validator.decorator';
import { BookStatus } from '../../enums/book.enum';

//   @IsValidEnum({ enum: LessorRank, required: false })
//   rank?: LessorRank;

//   @IsValidText({ required: false, trim: true })
//   searchText?: string;
// }

// export class UpdateLessorAdminReqDto {
//   @IsValidNumber({ required: true, min: 1 })
//   lessorId: number;

//   @IsValidText({})
//   name?: string;

//   @IsValidEnum({ enum: LessorStatus, required: false })
//   status?: LessorStatus;
// }

export class UpdateStatusLessorBookReqDto {
  @IsValidNumber({ min: 1 })
  bookId: number;

  @IsValidEnum({ enum: BookStatus })
  status: BookStatus;
}
