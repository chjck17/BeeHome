import { PolicyResDto } from '../../../../casl/dtos/res/policy.res.dto';
// import { FileResDto } from '../../../../file/dtos/res/file.res.dto';
import { Admin } from '../../../entities/admin.entity';
import { AdminStatus } from '../../../enums/admin.enum';
import { UserResDto } from './user.res.dto';

export class AdminResDto {
  id: number;
  username: string;
  status: AdminStatus;
  name: string;
  // avatar: FileResDto;
  user: UserResDto;
  policies: PolicyResDto[];

  private static mapProperty(dto: AdminResDto, data: Admin) {
    dto.id = data.id;
    dto.name = data.name;
    dto.username = data.username;
  }

  static forAdmin(data?: Admin) {
    const result = new AdminResDto();
    if (!data) return result;

    this.mapProperty(result, data);
    this.mapPolicies(result, data);

    result.status = data.status;
    // result.avatar = FileResDto.forAdmin(data.avatar);
    result.user = UserResDto.forAdmin(data.user);

    return result;
  }

  private static mapPolicies(dto: AdminResDto, data: Admin) {
    dto.policies = [];
    if (!data?.user?.userToGroupPolicies) return;

    for (const userToGroupPolicy of data.user.userToGroupPolicies) {
      if (!userToGroupPolicy?.groupPolicy?.groupToPolicies) continue;

      const groupToPolicies = userToGroupPolicy.groupPolicy.groupToPolicies;

      for (const groupToPolicy of groupToPolicies) {
        dto.policies.push(PolicyResDto.forAdmin(groupToPolicy.policy));
      }
    }
  }
}
