import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomRepository extends BaseRepository<Room> {
  constructor(dataSource: DataSource) {
    super(Room, dataSource);
  }
}
