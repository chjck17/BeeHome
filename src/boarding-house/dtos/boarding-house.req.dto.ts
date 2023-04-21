import {
  IsValidArrayNumber,
  IsValidArrayObject,
  IsValidArrayString,
  IsValidEnum,
  IsValidNumber,
  IsValidNumberString,
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
  CreateBoardingHouseDescriptionReqDto,
  UpdateBoardingHouseDescriptionReqDto,
} from './boarding-house-description.dto';
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

  @IsValidArrayString({ minSize: 1, required: true })
  tagIds: string[];

  @IsValidNumber()
  floor: number;

  @IsValidNumberString()
  electricFee: string;

  @IsValidNumberString()
  waterFee: string;

  @IsValidNumberString()
  serviceFee: string;

  @IsValidEnum({ enum: BoardingHouseType, required: true })
  type: BoardingHouseType;

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    CreateBoardingHouseRenDepositReqDto,
  )
  houseRentDeposits: CreateBoardingHouseDescriptionReqDto[];

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    CreateBoardingHouseDescriptionReqDto,
  )
  houseDescriptions: CreateBoardingHouseDescriptionReqDto[];

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
  @IsValidNumber()
  id: number;

  @IsValidText({ trim: true, required: false })
  name?: string;

  @IsValidEnum({ enum: Status, required: false })
  status?: Status;

  @IsValidEnum({ enum: BoardingHouseType, required: false })
  type?: BoardingHouseType;

  @IsValidNumberString({ required: false })
  electricFee?: string;

  @IsValidNumberString({ required: false })
  waterFee?: string;

  @IsValidNumberString({ required: false })
  serviceFee?: string;

  @IsValidArrayString({ minSize: 1, required: true })
  tagIds: string[];

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    UpdateBoardingHouseRenDepositReqDto,
  )
  houseRentDeposits: UpdateBoardingHouseRenDepositReqDto[];

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: true },
    UpdateBoardingHouseDescriptionReqDto,
  )
  houseDescriptions: UpdateBoardingHouseDescriptionReqDto[];

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
