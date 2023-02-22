import {
    IsValidArrayNumber, IsValidText
} from '../../../common/decorators/custom-validator.decorator';

export class CreateGroupPolicyDto {
  @IsValidText()
  name: string;

  @IsValidText()
  description: string;

  @IsValidArrayNumber()
  policiesIds: number[];
}
