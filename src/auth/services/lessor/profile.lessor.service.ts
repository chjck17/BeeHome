import { Injectable } from '@nestjs/common';
import { LessorResDto } from '../../dtos/common/res/lessor.res.dto';
import { UpdateProfileLessorReqDto } from '../../dtos/lessor/req/auth.lessor.req.dto';
import { User } from '../../entities/user.entity';
import { LessorRepository } from '../../repositories/lessor.repository';

@Injectable()
export class ProfileLessorService {
  constructor(private lessorRepo: LessorRepository) {}

  async get(user: User) {
    const lessor = await this.lessorRepo.findOneOrThrowNotFoundExc({
      where: { userId: user.id },
      relations: { avatar: true },
    });

    return LessorResDto.forLessor(lessor);
  }

  async update(dto: UpdateProfileLessorReqDto, user: User) {
    const { address, avatarId, name, phoneNumber } = dto;

    let lessor = await this.lessorRepo.findOneByOrThrowNotFoundExc({
      userId: user.id,
    });

    lessor = {
      ...lessor,
      address,
      name,
      phoneNumber,
      avatarId,
    };

    await this.lessorRepo.save(lessor);

    return this.get(user);
  }
}
