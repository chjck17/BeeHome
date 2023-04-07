import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { RoomToAttribute } from '../entities/room-to-attribute.entity';

@Injectable()
export class RoomToAttributeRepository extends BaseRepository<RoomToAttribute> {
  constructor(dataSource: DataSource) {
    super(RoomToAttribute, dataSource);
  }
}
