import { Injectable } from '@nestjs/common';
import { MerchantResDto } from '../../dtos/common/res/merchant.res.dto';
import { UpdateProfileMerchantReqDto } from '../../dtos/merchant/req/auth.merchant.req.dto';
import { User } from '../../entities/user.entity';
import { MerchantRepository } from '../../repositories/merchant.repository';

@Injectable()
export class ProfileMerchantService {
  constructor(private merchantRepo: MerchantRepository) {}

  async get(user: User) {
    const merchant = await this.merchantRepo.findOneOrThrowNotFoundExc({
      where: { userId: user.id },
      // relations: { avatar: true },
    });

    return MerchantResDto.forMerchant(merchant);
  }

  async update(dto: UpdateProfileMerchantReqDto, user: User) {
    const { address, avatarId, name, phoneNumber } = dto;

    let merchant = await this.merchantRepo.findOneByOrThrowNotFoundExc({
      userId: user.id,
    });

    merchant = {
      ...merchant,
      address,
      name,
      phoneNumber,
      // avatarId,
    };

    await this.merchantRepo.save(merchant);

    return this.get(user);
  }
}
