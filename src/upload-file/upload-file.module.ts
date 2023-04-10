import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { UploadFileController } from './test.controller';
import { UploadFileController } from './upload-file.controller';
import { LocalFileRepository } from '../local-file/local-file.repository';
import LocalFilesService from '../local-file/local-file.service';
import { UploadFileService } from './upload-file.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [UploadFileController],
  providers: [UploadFileService, LocalFilesService, LocalFileRepository],
})
export class UploadFileModule {}
