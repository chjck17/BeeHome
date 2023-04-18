import { Injectable } from '@nestjs/common';

import { FloorRepository } from '../repositories/floor.repository';

@Injectable()
export class FloorLessorService {
  constructor(private floorRepo: FloorRepository) {}
  async findOne(id: number) {
    const floor = await this.floorRepo.findOneOrThrowNotFoundExc({
      where: { id },
      relations: {
        rooms: {
          roomImages: true,
          roomToAttributes: true,
          roomToCategories: true,
        },
      },
    });
    return floor;
  }
}
