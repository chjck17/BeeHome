import {
  IsValidArrayNumber,
  IsValidArrayObject,
  IsValidEnum,
  IsValidObject,
  IsValidText,
} from '../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../common/dtos/pagination.dto';
import { Status } from '../../common/enums/status.enum';
import { BoardingHouseType } from '../enums/type.enum';
import {
  CreateAddressReqDto,
  UpdateAddressReqDto,
} from './boarding-house-adress.dto';
import {
  CreateBoardingHouseRenDepositReqDto,
  UpdateBoardingHouseRenDepositReqDto,
} from './boarding-house-rent-deposits.dto';
import {
  CreateBoardingHouseRuleReqDto,
  UpdateBoardingHouseRuleReqDto,
} from './boarding-house-rule.dto';

export class CreateBoardingHouseReqDto {
  @IsValidText({ trim: true, required: true })
  name: string;

  @IsValidEnum({ enum: Status, required: true })
  status: Status;

  @IsValidEnum({ enum: BoardingHouseType, required: true })
  type: BoardingHouseType;

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    CreateBoardingHouseRenDepositReqDto,
  )
  houseRentDeposits: CreateBoardingHouseRenDepositReqDto[];

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    CreateBoardingHouseRuleReqDto,
  )
  boardingHouseRules: CreateBoardingHouseRuleReqDto[];

  @IsValidObject({
    object: CreateAddressReqDto,
  })
  address: CreateAddressReqDto;
}
export class GetListBoardingHousesReqDto extends PaginationReqDto {}

export class UpdateBoardingHouseReqDto {
  @IsValidText({ trim: true, required: false })
  name?: string;

  @IsValidEnum({ enum: Status, required: false })
  status?: Status;

  @IsValidEnum({ enum: BoardingHouseType, required: false })
  type?: BoardingHouseType;

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    UpdateBoardingHouseRenDepositReqDto,
  )
  houseRenDeposits: UpdateBoardingHouseRenDepositReqDto[];

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    UpdateBoardingHouseRuleReqDto,
  )
  boardingHouseRules: UpdateBoardingHouseRuleReqDto[];

  @IsValidObject({
    object: UpdateAddressReqDto,
  })
  address: UpdateAddressReqDto;
}
export class DeleteListReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
