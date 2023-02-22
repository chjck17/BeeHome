import { User } from '../../../entities/user.entity';
import { UserType } from '../../../enums/user.enum';

export class UserResDto {
  id: number;
  type: UserType;

  static mapProperty(dto: UserResDto, data: User) {
    dto.id = data.id;
  }

  static forCustomer(data?: User) {
    const result = new UserResDto();
    if (!data) return result;

    UserResDto.mapProperty(result, data);
    return result;
  }

  static forMerchant(data?: User) {
    const result = new UserResDto();
    if (!data) return result;

    UserResDto.mapProperty(result, data);
    result.type = data.type;

    return result;
  }

  static forAdmin(data?: User) {
    const result = new UserResDto();
    if (!data) return result;

    UserResDto.mapProperty(result, data);
    result.type = data.type;

    return result;
  }
}
