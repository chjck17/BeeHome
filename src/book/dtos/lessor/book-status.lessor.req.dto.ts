import {
  IsValidEnum,
  IsValidNumber,
} from '../../../common/decorators/custom-validator.decorator';
import { BookStatus } from '../../enums/book.enum';

export class UpdateStatusLessorBookReqDto {
  @IsValidNumber({ min: 1 })
  bookId: number;

  @IsValidEnum({ enum: BookStatus })
  status: BookStatus;
}
