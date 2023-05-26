import { IsValidEnum } from 'src/common/decorators/custom-validator.decorator';
import { PackType } from 'src/service-pack/enums/pack.enum';

export class CreateVnPay {
  @IsValidEnum({ enum: PackType })
  status: PackType;
  // //   @IsValidText({ trim: true, required: false })
  // amount?: string;
  // //   @IsValidText({ trim: true, required: false })
  // bankCode?: string;
  // //   @IsValidText({ trim: true, required: false })
  // orderDescription?: string;

  // orderType?: string;

  // language?: string;
}

export class CreateVnPayQue {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}
