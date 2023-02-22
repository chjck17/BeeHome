import { IsValidArrayString } from '../../../common/decorators/custom-validator.decorator';

export class DeleteManyGroupPoliciesDto {
  @IsValidArrayString()
  groupPoliciesKeys: string[];
}
