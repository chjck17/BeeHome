import { GroupPolicy } from '../../entities/group-policies.entity';
import { GroupPolicyStatus } from '../../enums/group-policy.enum';

export class GroupPolicyResDto {
  key: string;
  name: string;
  description: string;
  createdAt: Date;
  status: GroupPolicyStatus;

  static mapProperty(dto: GroupPolicyResDto, data: GroupPolicy) {
    dto.name = data.name;
    dto.key = data.key;
    dto.description = data.description;
    dto.createdAt = data.createdAt;
  }

  static forAdmin(data: GroupPolicy) {
    const result = new GroupPolicyResDto();
    if (!data) return result;

    this.mapProperty(result, data);

    result.status = data.status;

    return result;
  }
}
