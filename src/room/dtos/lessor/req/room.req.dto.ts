import {
  IsValidArrayNumber,
  IsValidEnum,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import { Status } from '../../../../common/enums/status.enum';

export class CreateRoomReqDto {
  @IsValidText({ trim: true, required: true })
  name: string;

  @IsValidEnum({ enum: Status, required: true })
  status: Status;
}
export class GetListRoomsReqDto extends PaginationReqDto {}

export class UpdateRoomReqDto {
  @IsValidText({ trim: true, required: false })
  name?: string;

  @IsValidEnum({ enum: Status, required: false })
  status?: Status;
}
export class DeleteListReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
