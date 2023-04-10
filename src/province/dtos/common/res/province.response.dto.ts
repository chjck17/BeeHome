import { Province } from '../../../entities/province.entity';
import { ProvinceType } from '../../../enums/province.enum';

export class ProvinceResDto {
  id: number;
  name: string;
  type: ProvinceType;
  parentId: number;
  static mapProperty(data: Province) {
    const result = new ProvinceResDto();
    if (!data) return null;
    result.id = data.id;
    result.name = data.name;
    result.type = data.type;
    result.parentId = data.parentId;
    return result;
  }
  static forCustomer(data: Province) {
    const result = this.mapProperty(data);
    return result;
  }
}
