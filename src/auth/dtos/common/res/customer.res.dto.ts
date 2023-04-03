// import { FileResDto } from '../../../../file/dtos/res/file.res.dto';
import { Customer } from '../../../entities/customer.entity';
import { CustomerStatus } from '../../../enums/customer.enum';
import { LessorResDto } from './lessor.res.dto';
import { UserResDto } from './user.res.dto';

export class CustomerResDto {
  id: number;
  phoneNumber: string;
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  status: CustomerStatus;
  user: UserResDto;
  lessor: LessorResDto;
  // avatar: FileResDto;

  static mapProperty(dto: CustomerResDto, data: Customer) {
    dto.id = data.id;
    dto.phoneNumber = data.phoneNumber;
    dto.address = data.address;
    dto.email = data.email;
    dto.firstName = data.firstName;
    dto.lastName = data.lastName;
    dto.birthDate = data.birthDate;
  }

  static forCustomer(data?: Customer) {
    const result = new CustomerResDto();
    if (!data) return result;

    this.mapProperty(result, data);

    // result.avatar = FileResDto.forCustomer(data.avatar);

    return result;
  }

  static forLessor(data?: Customer) {
    const result = new CustomerResDto();
    if (!data) return result;

    this.mapProperty(result, data);
    result.status = data.status;
    // result.avatar = FileResDto.forLessor(data.avatar);
    result.user = UserResDto.forLessor(data.user);

    return result;
  }

  static forAdmin(data?: Customer) {
    const result = new CustomerResDto();
    if (!data) return result;

    this.mapProperty(result, data);
    result.status = data.status;
    // result.avatar = FileResDto.forCustomer(data.avatar);
    result.user = UserResDto.forCustomer(data.user);
    // result.lessor = LessorResDto.forAdmin(data.lessorUser?.lessor);

    return result;
  }
}
