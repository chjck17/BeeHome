import {
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { Language } from '../../../../common/enums/lang.enum';
import { IsArrayObjUniqueProperty } from '../../../../common/validators/array-unique-property.validator';
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
export class SaveRoomAttributeReqDto {
  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    RoomAttributeDetailReqDto,
  )
  @IsArrayObjUniqueProperty(['lang'])
  roomAttributeDetails: RoomAttributeDetailReqDto[];
}

export class CreateRoomAttributeReqDto extends SaveRoomAttributeReqDto {}

export class UpdateRoomAttributeReqDto {
  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    UpdateRoomAttributeDetailReqDto,
  )
  @IsArrayObjUniqueProperty(['lang'])
  roomAttributeDetails: UpdateRoomAttributeDetailReqDto[];

  @IsValidNumber({ required: false })
  id?: number;
}
