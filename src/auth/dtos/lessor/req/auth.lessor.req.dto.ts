import { IsEmail } from 'class-validator';
import {
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

export class LessorLoginReqDto {
  @IsEmail()
  email: string;

  @IsValidText()
  password: string;
}

export class LessorRegisterReqDto {
  @IsEmail()
  email: string;

  @IsValidText()
  password: string;
}

export class RegisterLessorReqDto {
  @IsEmail()
  email: string;

  @IsValidText()
  password: string;

  @IsValidText({ required: true })
  address: string;

  @IsValidText({ required: true })
  phoneNumber: string;
}

export class UpdateProfileLessorReqDto {
  @IsValidText({ required: false })
  name?: string;

  @IsValidText({ required: false })
  address?: string;

  @IsValidText({ required: false })
  phoneNumber?: string;

  @IsValidNumber({ min: 0, required: false })
  avatarId?: number;
}
