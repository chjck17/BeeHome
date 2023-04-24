import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
  constructor(dataSource: DataSource) {
    super(Comment, dataSource);
  }
}
