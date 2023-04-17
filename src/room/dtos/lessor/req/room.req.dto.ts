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
  @ApiProperty({ type: Array, format: 'binary' })
  photo_url: string[];

  @IsValidNumber()
  floorId: number;

  @IsValidText({ trim: true, required: true })
  name: string;

  @IsValidNumberString()
  price: string;

  @IsValidNumberString()
  acreage: string;

  @IsValidArrayString({ minSize: 1, required: true })
  categoryIds: string[];

  @IsValidArrayString({ minSize: 1, required: true })
  attributeIds: string[];
}
export class GetListRoomsReqDto extends PaginationReqDto {}

export class UpdateRoomReqDto {
  @IsValidNumber({ required: true })
  floorId: number;

  @IsValidNumber({ required: true })
  roomId: number;

  @IsValidText({ trim: true, required: false })
  name?: string;

  @IsValidNumberString({ required: false })
  price?: string;

  @IsValidNumberString({ required: false })
  acreage?: string;

  @IsValidArrayNumber({ required: false })
  categoryIds: number[];

  @IsValidArrayNumber({ required: false })
  attributeIds: number[];

  @IsValidEnum({ enum: Status, required: false })
  status?: RoomStatus;
}
export class DeleteListReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
