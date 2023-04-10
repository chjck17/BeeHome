import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalFileDto } from './local-file.dto';
import { LocalFileRepository } from './local-file.repository';

@Injectable()
class LocalFilesService {
  constructor(private localFilesRepo: LocalFileRepository) {}

  async saveLocalFileData(fileData: LocalFileDto) {
    const newFile = this.localFilesRepo.create(fileData);
    await this.localFilesRepo.save(newFile);
    return newFile;
  }

  async getFileById(fileId: number) {
    const file = await this.localFilesRepo.findOne({ where: { id: fileId } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}

export default LocalFilesService;
