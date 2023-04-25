import { ApiProperty } from '@nestjs/swagger';
import {
  IsValidArrayNumber,
  IsValidArrayString,
  IsValidEnum,
  IsValidNumber,
  IsValidNumberString,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { Status } from '../../../../common/enums/status.enum';
import { RoomStatus } from '../../../enums/room.enum';

export class CreateRoomReqDto {
  @IsValidNumber()
  floorId: number;

  @IsValidText({ trim: true, required: true })
  name: string;

  @IsValidNumberString()
  price: string;

  @IsValidNumberString()
  acreage: string;

  @IsValidArrayNumber({ minSize: 1, required: true })
  imgIds: number[];

  @IsValidArrayString({ minSize: 1, required: true })
  categoryIds: string[];

  @IsValidArrayString({ minSize: 1, required: true })
  attributeIds: string[];
}
export class GetListRoomsReqDto extends PaginationReqDto {}

export class UpdateRoomReqDto {
  @IsValidNumber({ required: true })
  roomId: number;

  @IsValidText({ trim: true, required: false })
  name?: string;

  @IsValidNumberString({ required: false })
  price?: string;

  @IsValidNumberString({ required: false })
  acreage?: string;

  @IsValidArrayNumber({ required: false })
  imgIds: number[];

  @IsValidArrayString({ required: false })
  categoryIds: string[];

  @IsValidArrayString({ required: false })
  attributeIds: string[];

  @IsValidEnum({ enum: RoomStatus, required: false })
  status?: RoomStatus;
}
export class DeleteListReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
