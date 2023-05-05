import { IsEmail } from 'class-validator';
import {
  IsValidArrayNumber,
  IsValidDate,
  IsValidNumber,
  IsValidText,
} from '../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../common/dtos/pagination.dto';

export class CreateBookReqDto {
  @IsValidNumber({ min: 1 })
  userId: number;

  @IsValidNumber({ min: 1 })
  roomId: number;

  @IsValidText({ trim: true, required: true })
  firstName: string;

  @IsValidText({ trim: true, required: true })
  lastName: string;

  @IsEmail()
  email?: string;

  @IsValidText({ maxLength: 300, required: false, trim: true })
  address?: string;

  @IsValidText({ matches: /\d{10}/, required: true, trim: true })
  phoneNumber: string;

  @IsValidDate({ required: false })
  dateMeet?: Date;
}
export class GetListBooksReqDto extends PaginationReqDto {}

export class UpdateBookReqDto {
  @IsValidText({ trim: true, required: false })
  name?: string;
  @IsValidText({ trim: true, required: false })
  slug?: string;
  @IsValidText({ trim: true, required: false })
  description?: string;
}
export class DeleteListBookReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
