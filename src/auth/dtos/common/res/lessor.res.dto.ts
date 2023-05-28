import { PackType } from 'src/service-pack/enums/pack.enum';
import { Lessor } from '../../../entities/lessor.entity';
import { LessorRank, LessorStatus } from '../../../enums/lessor.enum';
import { UserResDto } from './user.res.dto';

export class LessorResDto {
  id: number;
  name: string;
  email: string;
  status: LessorStatus;
  rank: LessorRank;
  address: string;
  phoneNumber: string;
  user?: UserResDto;
  avatar?: string;
  package: PackType;

  static mapProperty(dto: LessorResDto, data: Lessor) {
    dto.id = data.id;
    dto.name = data.name;
    dto.email = data.email;
    dto.address = data.address;
    dto.phoneNumber = data.phoneNumber;
    dto.avatar = data.avatar?.path ? data.avatar?.path : null;
    dto.package = data.packType;
  }

  static forLessor(data?: Lessor) {
    const result = new LessorResDto();
    if (!data) return result;

    this.mapProperty(result, data);
    result.user = UserResDto.forLessor(data.user);

    return result;
  }

  static forAdmin(data?: Lessor) {
    const result = new LessorResDto();
    if (!data) return result;

    this.mapProperty(result, data);

    result.status = data.status;
    result.rank = data.rank;
    result.user = UserResDto.forAdmin(data.user);
    // result.avatar = FileResDto.forAdmin(data.avatar);

    return result;
  }
}
