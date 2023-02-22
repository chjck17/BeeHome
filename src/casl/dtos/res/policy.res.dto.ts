import {
    Action,
    ActionAbility,
    Resource
} from '../../../common/enums/casl.enum';
import { Policy } from '../../entities/policies.entity';

export class PolicyResDto {
  name: string;
  action: Action;
  resource: Resource;
  actionAbility: ActionAbility;

  static mapProperty(dto: PolicyResDto, data: Policy) {
    dto.name = data.name;
    dto.action = data.action;
    dto.resource = data.resource;
    dto.actionAbility = data.actionAbility;
  }

  static forAdmin(data: Policy) {
    const result = new PolicyResDto();
    if (!data) return result;

    PolicyResDto.mapProperty(result, data);

    return result;
  }
}
