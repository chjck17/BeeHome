import {
    IsValidArrayNumber,
    IsValidEnum,
    IsValidText
} from '../../../common/decorators/custom-validator.decorator';
import { GroupPolicyStatus } from '../../enums/group-policy.enum';

export class UpdateGroupPoliciesDto {
  @IsValidText()
  key: string;

  @IsValidText()
  name: string;

  @IsValidText()
  description: string;

  @IsValidArrayNumber()
  policiesIds: number[];

  @IsValidEnum({ enum: GroupPolicyStatus })
  status: GroupPolicyStatus;
}
