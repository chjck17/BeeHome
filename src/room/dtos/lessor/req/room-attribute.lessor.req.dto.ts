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
import {
  CreateRoomAttributeReqDto,
  UpdateRoomAttributeReqDto,
} from './room-attribute-term.lessor.req.dto';

export class RoomAttributeTermDetailReqDto {
  @IsValidEnum({ enum: Language })
  lang: Language;

  @IsValidText({ trim: true })
  value: string;

  @IsValidText({ trim: true })
  slug: string;
}
export class UpdateRoomAttributeTermDetailReqDto {
  @IsValidNumber()
  id: number;

  @IsValidEnum({ enum: Language })
  lang: Language;

  @IsValidText({ trim: true })
  value: string;

  @IsValidText({ trim: true })
  slug: string;
}
export class CreateRoomAttributeTermReqDto {
  @IsValidArrayObject({ minSize: 1, maxSize: 2 }, RoomAttributeTermDetailReqDto)
  @IsArrayObjUniqueProperty(['lang'])
  roomAttributeTermDetails: RoomAttributeTermDetailReqDto[];

  @IsValidArrayObject({ minSize: 1, required: true }, CreateRoomAttributeReqDto)
  roomAttributes: CreateRoomAttributeReqDto[];
}

export class UpdateRoomAttributeTermReqDto {
  @IsValidNumber()
  id: number;

  @IsValidArrayObject({ minSize: 1, maxSize: 2 }, RoomAttributeTermDetailReqDto)
  @IsArrayObjUniqueProperty(['lang'])
  roomAttributeTermDetails: UpdateRoomAttributeTermDetailReqDto[];

  @IsValidArrayObject(
    { minSize: 1, required: true },
    CreateRoomAttributeTermReqDto,
  )
  roomAttributes: UpdateRoomAttributeReqDto[];
}

export class DeleteRoomAttributeTermsReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}

export class GetListRoomAttributeTermReqDto extends PaginationReqDto {}
