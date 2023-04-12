import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Room } from '../entities/room.entity';
import { RoomImage } from '../entities/room-image.entity';

@Injectable()
export class RoomImageRepository extends BaseRepository<RoomImage> {
  constructor(dataSource: DataSource) {
    super(RoomImage, dataSource);
  }
}
