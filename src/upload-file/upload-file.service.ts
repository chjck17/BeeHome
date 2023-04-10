import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import LocalFilesService from '../local-file/local-file.service';
import { LocalFileDto } from '../local-file/local-file.dto';

@Injectable()
export class UploadFileService {
  constructor(private localFilesService: LocalFilesService) {}

  async addAvatar(userId: number, fileData: LocalFileDto) {
    await this.localFilesService.saveLocalFileData(fileData);
  }
}
