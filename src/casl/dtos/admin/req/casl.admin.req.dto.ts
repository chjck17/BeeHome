import { IsIn } from 'class-validator';
import {
  IsValidArrayNumber,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../../common/dtos/pagination.dto';
import {
  GroupPolicyStatus,
  GroupPolicyType,
} from '../../../enums/group-policy.enum';
import { PolicyType } from '../../../enums/policy.enum';

export class GetListPoliciesAdminReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;

  @IsValidEnum({ enum: PolicyType, required: false })
  type?: PolicyType;
}

export class CreateGroupPolicyAdminReqDto {
  @IsValidText()
  name: string;

  @IsValidText()
  description: string;

  @IsValidArrayNumber()
  policyIds: number[];

  @IsIn(['ADMIN', 'COMMON'], {
    message: 'Type must be one of: ADMIN or COMMON',
  })
  @IsValidEnum({ enum: GroupPolicyType, required: true })
  type: GroupPolicyType;
}

export class DeleteManyGroupPoliciesAdminReqDto {
  @IsValidArrayNumber()
  groupPoliciesIds: number[];
}

export class GetListGroupPoliciesAdminReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;

  @IsValidEnum({ enum: GroupPolicyStatus, required: false })
  status?: GroupPolicyStatus;

  @IsValidEnum({ enum: GroupPolicyType, required: false })
  type?: GroupPolicyType;
}

export class UpdateGroupPoliciesAdminReqDto {
  @IsValidNumber()
  id: number;

  @IsValidText()
  name: string;

  @IsValidText()
  description: string;

  @IsValidArrayNumber()
  policyIds: number[];

  @IsValidEnum({ enum: GroupPolicyStatus })
  status: GroupPolicyStatus;

  @IsIn([GroupPolicyType.ADMIN, GroupPolicyType.COMMON], {
    message: 'Type must be one of: ADMIN or COMMON',
  })
  @IsValidEnum({ enum: GroupPolicyType })
  type: GroupPolicyType;
}
