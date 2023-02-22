import { IsEmail } from 'class-validator';
import {
  IsValidDate,
  IsValidNumber,
  IsValidNumberString,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

export class RegisterCustomerReqDto {
  // @IsValidNumber({ min: 1 })
  // merchantId: number;
  @IsEmail()
  email: string;

  @IsValidText({ maxLength: 30 })
  firstName: string;

  @IsValidText({ maxLength: 30 })
  lastName: string;

  @IsValidText({ minLength: 6, maxLength: 50 })
  password: string;

  @IsValidDate()
  birthDate: Date;

  // @IsValidText({ maxLength: 1000 })
  // firebaseIdToken: string;
}

export class LoginCustomerReqDto {
  @IsValidNumberString()
  phoneNumber: string;

  @IsValidText({ maxLength: 255 })
  password: string;

  @IsValidNumber({ min: 1 })
  merchantId: number;
}
