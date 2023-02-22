import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { IsNull } from 'typeorm';
import { DeleteMultipleByIdNumberReqDto } from '../../../common/dtos/delete-multiple.dto';
import { NotFoundExc } from '../../../common/exceptions/custom.exception';
import {
  ListMerchantAdminReqDto,
  UpdateStatusMerchantAdminReqDto,
} from '../../dtos/admin/req/merchant.admin.req.dto';
import { MerchantResDto } from '../../dtos/common/res/merchant.res.dto';
import { MerchantRepository } from '../../repositories/merchant.repository';

@Injectable()
export class MerchantAdminService {
  constructor(private merchantRepo: MerchantRepository) {}

  async getList(dto: ListMerchantAdminReqDto) {
    const { rank, status, limit, page } = dto;
    let { searchText } = dto;

    const queryBuilder = this.merchantRepo
      .createQueryBuilder('merchant')
      .leftJoinAndSelect('merchant.avatar', 'avatar');

    if (searchText) {
      searchText = `%${searchText}%`;
      queryBuilder.andWhere('merchant.email ILIKE :searchText', {
        searchText,
      });
    }
    if (status) queryBuilder.andWhere('merchant.status = :status', { status });
    if (rank) queryBuilder.andWhere('merchant.rank = :rank', { rank });

    const { items, meta } = await paginate(queryBuilder, { limit, page });

    const merchants = items.map((item) => MerchantResDto.forAdmin(item));

    return new Pagination(merchants, meta);
  }

  async getDetail(id: number) {
    const merchant = await this.merchantRepo.findOneOrThrowNotFoundExc({
      where: { id },
      // relations: { avatar: true },
    });
    return MerchantResDto.forAdmin(merchant);
  }

  async updateStatus(dto: UpdateStatusMerchantAdminReqDto) {
    const { merchantId, status } = dto;

    const { affected } = await this.merchantRepo.update(
      { id: merchantId, deletedAt: IsNull() },
      { status },
    );

    if (affected < 1) throw new NotFoundExc('Merchant not found');
  }

  async deleteList(dto: DeleteMultipleByIdNumberReqDto) {
    const { ids } = dto;
    return this.merchantRepo.softDelete(ids);
  }

  async deleteSingle(id: number) {
    const merchant = await this.merchantRepo.findOneByOrThrowNotFoundExc({
      id,
    });

    return this.merchantRepo.softRemove(merchant);
  }
}
