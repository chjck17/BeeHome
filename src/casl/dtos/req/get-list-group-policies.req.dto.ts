import {
    IsValidEnum,
    IsValidText
} from '../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../common/dtos/pagination.dto';
import { GroupPolicyStatus } from '../../enums/group-policy.enum';

export class GetListGroupPoliciesReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;

  @IsValidEnum({ enum: GroupPolicyStatus, required: false })
  status?: GroupPolicyStatus;
}
