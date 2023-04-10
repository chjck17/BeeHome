import { IsValidText } from '../../common/decorators/custom-validator.decorator';

export class UpdateAddressReqDto {
  @IsValidText({ trim: true, required: false })
  address?: string;

  @IsValidText({ trim: true, required: false })
  province?: string;

  @IsValidText({ trim: true, required: false })
  ward?: string;

  @IsValidText({ trim: true, required: false })
  district?: string;
}

export class CreateAddressReqDto {
  @IsValidText({ trim: true, required: true })
  address: string;

  @IsValidText({ trim: true, required: true })
  province: string;

  @IsValidText({ trim: true, required: true })
  ward: string;

  @IsValidText({ trim: true, required: true })
  district: string;
}
