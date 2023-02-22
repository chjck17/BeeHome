import { IsEmail } from 'class-validator';
import {
    IsValidDate,
    IsValidNumber,
    IsValidText
} from '../../../../common/decorators/custom-validator.decorator';

export class UpdateProfileCustomerReqDto {
  @IsValidText({ maxLength: 30 })
  firstName: string;

  @IsValidText({ maxLength: 30 })
  lastName: string;

  @IsValidDate({ required: false })
  birthDate?: Date;

  @IsValidText({ matches: /\d{10}/, required: true, trim: true })
  phoneNumber: string;

  @IsEmail()
  email?: string;

  @IsValidText({ maxLength: 300, required: false, trim: true })
  address?: string;

  @IsValidNumber({ min: 0, required: false })
  avatarId?: number;
}

export class UpdateAvatarCustomerReqDto {
  @IsValidNumber({ min: 1 })
  imageId: number;
}

export class UpdatePasswordCustomerReqDto {
  @IsValidText({ minLength: 6, maxLength: 50 })
  password: string;

  @IsValidText({ minLength: 6, maxLength: 50 })
  newPassword: string;
}
