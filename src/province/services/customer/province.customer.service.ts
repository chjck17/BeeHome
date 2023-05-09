import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional';
import { ProvinceResDto } from '../../dtos/common/res/province.response.dto';
import {
  GetData,
  GetListProvinceReqDto,
} from '../../dtos/customer/req/province.req.dto';
import { ProvinceRepository } from '../../repositories/province.repository';

@Injectable()
export class ProvinceCustomerService {
  constructor(private provinceRepo: ProvinceRepository) {}

  @Transactional()
  async getList(dto: GetListProvinceReqDto) {
    const { limit, page, type, parentId } = dto;
    let { searchText } = dto;
    const queryBuilder = this.provinceRepo
      .createQueryBuilder('p')
      .orderBy({ 'p.name': 'ASC' })
      .andWhere('p.type = :type', { type: type });
    if (parentId)
      queryBuilder.andWhere('p.parentId = :parentId', { parentId: parentId });
    if (searchText) {
      searchText = `%${dto.searchText}%`;
      queryBuilder.andWhere('p.name ILIKE :searchText', {
        searchText,
      });
    }
    const { items, meta } = await paginate(queryBuilder, { limit, page });
    const province = items.map((item) => ProvinceResDto.forCustomer(item));
    return new Pagination(province, meta);
  }

  async getData(dto: GetData) {
    const { province, district, ward } = dto;
    // let { searchText } = dto;
    const dataProvince = await this.provinceRepo.find({
      where: { parentId: 1 },
    });

    const provinceId = await this.provinceRepo.find({
      where: { name: province },
    });
    // const queryBuilder = this.provinceRepo
    //   .createQueryBuilder('p')
    //   .orderBy({ 'p.name': 'ASC' })
    //   .andWhere('p.type = :type', { type: type });
    // }
    // const { items, meta } = await paginate(queryBuilder, { limit, page });
    // const province = items.map((item) => ProvinceResDto.forCustomer(item));
    // return new Pagination(province, meta);
  }
}
