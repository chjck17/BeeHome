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
import { Language } from '../../common/enums/lang.enum';
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

  @IsValidNumber()
  floor: number;

  @IsValidText({ required: false })
  videoUrl?: string;

  @IsValidNumberString()
  electricFee: string;

  @IsValidNumberString()
  waterFee: string;

  @IsValidNumberString()
  serviceFee: string;

  @IsValidEnum({ enum: BoardingHouseType, required: true })
  type: BoardingHouseType;

  @IsValidArrayNumber({ minSize: 1, required: true })
  imgIds: number[];

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
export class GetListBoardingHousesReqDto extends PaginationReqDto {
  @IsValidEnum({ enum: Language, required: false })
  lang?: Language;

  @IsValidText({ trim: true, required: false })
  searchText?: string;

  @IsValidNumberString({ required: false })
  startPrice?: string;

  @IsValidNumberString({ required: false })
  endPrice?: string;

  @IsValidText({ trim: true, required: false })
  province?: string;

  @IsValidText({ trim: true, required: false })
  ward?: string;

  @IsValidText({ trim: true, required: false })
  district?: string;
}
export class GetListBoardingHousesCustomerReqDto extends PaginationReqDto {
  @IsValidEnum({ enum: Language, required: false })
  lang?: Language;

  @IsValidText({ trim: true, required: false })
  searchText?: string;

  @IsValidNumberString({ required: false })
  startPrice?: string;

  @IsValidNumberString({ required: false })
  endPrice?: string;

  @IsValidText({ trim: true, required: false })
  province?: string;

  @IsValidText({ trim: true, required: false })
  ward?: string;

  @IsValidText({ trim: true, required: false })
  district?: string;
}

export class GetListBoardingHousesByStarCustomerReqDto extends PaginationReqDto {}
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

  @IsValidText({ required: false })
  videoUrl?: string;

  @IsValidArrayNumber({ required: false })
  imgIds?: number[];

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: false },
    UpdateBoardingHouseRenDepositReqDto,
  )
  houseRentDeposits?: UpdateBoardingHouseRenDepositReqDto[];

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: false },
    UpdateBoardingHouseDescriptionReqDto,
  )
  houseDescriptions?: UpdateBoardingHouseDescriptionReqDto[];

  @IsValidArrayObject(
    { minSize: 1, maxSize: 2, required: false },
    UpdateBoardingHouseRuleReqDto,
  )
  boardingHouseRules?: UpdateBoardingHouseRuleReqDto[];

  @IsValidObject({
    object: UpdateAddressReqDto,
    required: false,
  })
  address?: UpdateAddressReqDto;
}
export class DeleteListReqDto {
  @IsValidArrayNumber({ minSize: 1, required: true })
  ids: number[];
}
