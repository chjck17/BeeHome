import {
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { Language } from '../../../../common/enums/lang.enum';
import { IsArrayObjUniqueProperty } from '../../../../common/validators/array-unique-property.validator';
import {
  CreateRoomAttributeTermReqDto,
  UpdateRoomAttributeTermReqDto,
} from './room-attribute-term.lessor.req.dto';
export class RoomAttributeDetailReqDto {
  @IsValidEnum({ enum: Language, required: true })
  lang: Language;

  @IsValidText({ trim: true, required: true })
  name: string;
}

export class UpdateRoomAttributeDetailReqDto {
  @IsValidNumber({ required: false })
  id?: number;

  @IsValidEnum({ enum: Language, required: true })
  lang: Language;

  @IsValidText({ trim: true, required: true })
  name: string;
}
export class SaveRoomAttributeReqDto extends PaginationReqDto {
  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    RoomAttributeDetailReqDto,
  )
  @IsArrayObjUniqueProperty(['lang'])
  roomAttributeDetails: RoomAttributeDetailReqDto[];

  @IsValidArrayObject(
    { minSize: 1, required: true },
    CreateRoomAttributeTermReqDto,
  )
  roomAttributeTerms: CreateRoomAttributeTermReqDto[];
}

export class CreateRoomAttributeReqDto extends SaveRoomAttributeReqDto {}

export class UpdateRoomAttributeReqDto {
  @IsValidNumber({ required: false })
  id?: number;

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    UpdateRoomAttributeDetailReqDto,
  )
  @IsArrayObjUniqueProperty(['lang'])
  roomAttributeDetails: UpdateRoomAttributeDetailReqDto[];

  @IsValidArrayObject(
    { minSize: 1, required: true },
    UpdateRoomAttributeTermReqDto,
  )
  roomAttributeTerms: UpdateRoomAttributeTermReqDto[];
}

export class GetListRoomAttributeReqDto extends PaginationReqDto {
  // @IsValidEnum({ enum: Language, required: true })
  // lang: Language;
}
export class GetListRoomAttributeTermReqDto extends PaginationReqDto {
  @IsValidEnum({ enum: Language, required: false })
  lang?: Language;
}
