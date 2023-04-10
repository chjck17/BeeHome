import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import LocalFilesService from './local-file.service';
import LocalFilesController from './local-file.controller';
import { LocalFile } from './local-file.entity';
import { LocalFileRepository } from './local-file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile]), ConfigModule],
  providers: [LocalFilesService, LocalFileRepository],
  exports: [LocalFilesService],
  controllers: [LocalFilesController],
})
export class LocalFilesModule {}
