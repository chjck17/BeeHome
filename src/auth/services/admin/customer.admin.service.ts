import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional';
import { DeleteMultipleByIdNumberReqDto } from '../../../common/dtos/delete-multiple.dto';
import {
  ExpectationFailedExc,
  NotFoundExc,
} from '../../../common/exceptions/custom.exception';
import {
  GetListCustomerAdminReqDto,
  SearchBy,
} from '../../dtos/admin/req/customer.admin.req.dto';
import { CustomerResDto } from '../../dtos/common/res/customer.res.dto';
import { CustomerRepository } from '../../repositories/customer.repository';

@Injectable()
export class CustomerAdminService {
  constructor(private customerRepo: CustomerRepository) {}

  @Transactional()
  async getList(dto: GetListCustomerAdminReqDto) {
    const { searchBy, limit, page } = dto;
    let { searchText } = dto;
    const queryBuilder = this.customerRepo
      .createQueryBuilder('customer')
      .orderBy('customer.id');

    if (searchBy && searchText) {
      searchText = `%${dto.searchText}%`;

      switch (searchBy) {
        case SearchBy.EMAIL:
          queryBuilder.where('customer.email ILIKE :searchText', {
            searchText,
          });
          break;
        case SearchBy.LESSOR_NAME:
          queryBuilder
            .innerJoin('customer.lessorUser', 'mu')
            .innerJoin('mu.lessor', 'lessor')
            .where('lessor.name ILIKE :searchText', { searchText });
          break;
        case SearchBy.PHONE:
          queryBuilder.where('customer.phoneNumber ILIKE :searchText', {
            searchText,
          });
          break;
      }
    }

    const { items, meta } = await paginate(queryBuilder, { limit, page });

    const customers = items.map((item) => CustomerResDto.forAdmin(item));
    return new Pagination(customers, meta);
  }

  async getDetail(id: number) {
    const customer = await this.customerRepo.findOneOrThrowNotFoundExc({
      where: { id },
      relations: {
        // avatar: true,
        user: true,
        // lessorUser: { lessor: { avatar: true } },
      },
    });

    return CustomerResDto.forAdmin(customer);
  }

  async deleteMultiple(dto: DeleteMultipleByIdNumberReqDto) {
    const { ids } = dto;
    const { affected } = await this.customerRepo.softDelete(ids);

    if (affected !== ids.length) throw new ExpectationFailedExc('Invalid data');
  }

  async deleteSingle(id: number) {
    const { affected } = await this.customerRepo.softDelete(id);

    if (!affected) throw new NotFoundExc('Customer not found');
  }
}
