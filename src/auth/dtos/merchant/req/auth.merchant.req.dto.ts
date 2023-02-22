import { IsEmail } from 'class-validator';
import {
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

export class MerchantLoginReqDto {
  @IsEmail()
  email: string;

  @IsValidText()
  password: string;
}

export class MerchantRegisterReqDto {
  @IsEmail()
  email: string;

  @IsValidText()
  password: string;
}

export class RegisterMerchantReqDto {
  @IsEmail()
  email: string;

  @IsValidText()
  password: string;
}

export class UpdateProfileMerchantReqDto {
  @IsValidText({ required: false })
  name?: string;

  @IsValidText({ required: false })
  address?: string;

  @IsValidText({ required: false })
  phoneNumber?: string;

  @IsValidNumber({ min: 0, required: false })
  avatarId?: number;
}
