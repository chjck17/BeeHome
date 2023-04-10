import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LocalFile } from './local-file.entity';
import { BaseRepository } from '../common/repositories/base.repositories';

@Injectable()
export class LocalFileRepository extends BaseRepository<LocalFile> {
  constructor(dataSource: DataSource) {
    super(LocalFile, dataSource);
  }
}
