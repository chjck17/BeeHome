// import { FileResDto } from '../../../../file/dtos/res/file.res.dto';
import { Merchant } from '../../../entities/merchant.entity';
import { MerchantRank, MerchantStatus } from '../../../enums/merchant.enum';
import { UserResDto } from './user.res.dto';

export class MerchantResDto {
  id: number;
  name: string;
  email: string;
  status: MerchantStatus;
  rank: MerchantRank;
  address: string;
  phoneNumber: string;
  user?: UserResDto;
  // avatar?: FileResDto;

  static mapProperty(dto: MerchantResDto, data: Merchant) {
    dto.id = data.id;
    dto.name = data.name;
    dto.email = data.email;
    dto.address = data.address;
    dto.phoneNumber = data.phoneNumber;
  }

  static forMerchant(data?: Merchant) {
    const result = new MerchantResDto();
    if (!data) return result;

    this.mapProperty(result, data);
    // result.avatar = FileResDto.forMerchant(data.avatar);
    result.user = UserResDto.forMerchant(data.user);

    return result;
  }

  static forAdmin(data?: Merchant) {
    const result = new MerchantResDto();
    if (!data) return result;

    this.mapProperty(result, data);

    result.status = data.status;
    result.rank = data.rank;
    result.user = UserResDto.forAdmin(data.user);
    // result.avatar = FileResDto.forAdmin(data.avatar);

    return result;
  }
}
