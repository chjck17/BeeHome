import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NotFoundExc } from '../../common/exceptions/custom.exception';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Merchant } from '../entities/merchant.entity';

@Injectable()
export class MerchantRepository extends BaseRepository<Merchant> {
  constructor(dataSource: DataSource) {
    super(Merchant, dataSource);
  }

  async findByUserIdOrThrowExc(userId: number) {
    const merchant = await this.findOneBy({ userId });
    if (!merchant) throw new NotFoundExc('Merchant not found');
    return merchant;
  }
}
