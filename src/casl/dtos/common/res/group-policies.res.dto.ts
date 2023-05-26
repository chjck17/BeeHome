import { GroupPolicy } from 'src/casl/entities/group-policies.entity';
import {
  GroupPolicyStatus,
  GroupPolicyType,
} from '../../../enums/group-policy.enum';
import { PolicyResDto } from './policy.res.dto';

export class GroupPolicyResDto {
  id: number;
  key: string;
  name: string;
  description: string;
  createdAt: Date;
  status: GroupPolicyStatus;
  type: GroupPolicyType;
  ownerId: number;
  policies: PolicyResDto[];

  static mapProperty(dto: GroupPolicyResDto, data: GroupPolicy) {
    dto.id = data.id;
    dto.name = data.name;
    dto.key = data.key;
    dto.description = data.description;
    dto.ownerId = data.ownerId;
    dto.createdAt = data.createdAt;
  }

  static forMerchant(data: GroupPolicy) {
    const result = new GroupPolicyResDto();
    if (!data) return null;

    this.mapProperty(result, data);

    result.status = data.status;
    result.type = data.type;
    result.policies = data.groupToPolicies?.map((item) =>
      PolicyResDto.forMerchant(item.policy),
    );

    return result;
  }

  static forAdmin(data: GroupPolicy) {
    const result = new GroupPolicyResDto();
    if (!data) return null;

    this.mapProperty(result, data);

    result.status = data.status;
    result.type = data.type;
    result.policies = data.groupToPolicies.map((item) =>
      PolicyResDto.forAdmin(item.policy),
    );

    return result;
  }
}
