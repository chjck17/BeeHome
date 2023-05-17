import { IsValidText } from '../../../../common/decorators/custom-validator.decorator';

export class AdminLoginReqDto {
  @IsValidText()
  email: string;

  @IsValidText()
  password: string;
}
