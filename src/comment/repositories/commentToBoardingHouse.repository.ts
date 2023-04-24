import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Comment } from '../entities/comment.entity';
import { CommentToBoardingHouse } from '../entities/commentToBoardingHouse.entity';

@Injectable()
export class CommentToBoardingHouseRepository extends BaseRepository<CommentToBoardingHouse> {
  constructor(dataSource: DataSource) {
    super(CommentToBoardingHouse, dataSource);
  }
}
