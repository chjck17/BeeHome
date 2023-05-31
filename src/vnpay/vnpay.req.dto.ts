import {
  IsValidEnum,
  IsValidNumber,
  IsValidNumberString,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import { PaginationReqDto } from 'src/common/dtos/pagination.dto';
import { PackType } from 'src/service-pack/enums/pack.enum';

export class SelectVnPay {
  @IsValidEnum({ enum: PackType })
  packType: PackType;
}

export class CreateVnPay {
  @IsValidNumberString()
  amount: string;

  @IsValidEnum({ enum: PackType })
  packType: PackType;
}

export class CreateVnPayQue {
  @IsValidEnum({ enum: PackType })
  packType: PackType;

  @IsValidText({ trim: true, required: true })
  vnp_Amount: string;

  @IsValidText({ trim: true, required: true })
  vnp_BankCode: string;

  @IsValidText({ trim: true, required: true })
  vnp_CardType: string;

  @IsValidText({ trim: true, required: true })
  vnp_OrderInfo: string;

  @IsValidText({ trim: true, required: true })
  vnp_TransactionNo: string;

  @IsValidText({ trim: true, required: true })
  vnp_TxnRef: string;
}

export class GetListBillsReqDto extends PaginationReqDto {}
