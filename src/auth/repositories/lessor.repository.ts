import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NotFoundExc } from '../../common/exceptions/custom.exception';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Lessor } from '../entities/lessor.entity';

@Injectable()
export class LessorRepository extends BaseRepository<Lessor> {
  constructor(dataSource: DataSource) {
    super(Lessor, dataSource);
  }

  async findByUserIdOrThrowExc(userId: number) {
    const lessor = await this.findOneBy({ userId });
    if (!lessor) throw new NotFoundExc('Lessor not found');
    return lessor;
  }
}
