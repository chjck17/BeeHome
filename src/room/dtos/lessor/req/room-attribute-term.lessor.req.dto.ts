import {
  IsValidArrayNumber,
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { Language } from '../../../../common/enums/lang.enum';
import { IsArrayObjUniqueProperty } from '../../../../common/validators/array-unique-property.validator';

export class RoomAttributeTermDetailReqDto {
  @IsValidEnum({ enum: Language })
  lang: Language;

  @IsValidText({ trim: true })
  name: string;

  @IsValidText({ trim: true })
  slug: string;
}
export class UpdateRoomAttributeTermDetailReqDto {
  @IsValidNumber()
  id: number;

  @IsValidEnum({ enum: Language })
  lang: Language;

  @IsValidText({ trim: true })
  name: string;

  @IsValidText({ trim: true })
  slug: string;
}
export class CreateRoomAttributeTermReqDto {
  @IsValidArrayObject({ minSize: 1, maxSize: 2 }, RoomAttributeTermDetailReqDto)
  @IsArrayObjUniqueProperty(['lang'])
  roomAttributeTermDetails: RoomAttributeTermDetailReqDto[];
}

export class UpdateRoomAttributeTermReqDto {
  @IsValidNumber()
  id: number;

  @IsValidArrayObject({ minSize: 1, maxSize: 2 }, RoomAttributeTermDetailReqDto)
  @IsArrayObjUniqueProperty(['lang'])
  roomAttributeTermDetails: UpdateRoomAttributeTermDetailReqDto[];
}

export class DeleteListReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
