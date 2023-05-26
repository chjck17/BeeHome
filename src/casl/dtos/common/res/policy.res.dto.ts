import { Policy } from 'src/casl/entities/policies.entity';
import {
  Action,
  ActionAbility,
  Resource,
} from '../../../../common/enums/casl.enum';

export class PolicyResDto {
  id: number;
  name: string;
  action: Action;
  resource: Resource;
  actionAbility: ActionAbility;

  static mapProperty(dto: PolicyResDto, data: Policy) {
    dto.id = data.id;
    dto.name = data.name;
    dto.action = data.action;
    dto.resource = data.resource;
    dto.actionAbility = data.actionAbility;
  }

  static forAdmin(data: Policy) {
    const result = new PolicyResDto();
    if (!data) return null;

    PolicyResDto.mapProperty(result, data);

    return result;
  }
  static forMerchant(data: Policy) {
    const result = new PolicyResDto();
    if (!data) return null;

    PolicyResDto.mapProperty(result, data);

    return result;
  }
}
