import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { FastifyFileInterceptor } from './interceptor/fastify-file-interceptor';
import { editFileName, imageFileFilter } from '../utils/file-upload-util';
import { fileMapper, filesMapper } from '../utils/file-mapper';
import { FastifyFilesInterceptor } from './interceptor/fastify-files-interceptor';
import { SingleFileDto } from './dto/single-file-dto';
import { MultipleFileDto } from './dto/multiple-files-dto';
import { UploadFileService } from './upload-file.service';

@Controller('upload-file')
@ApiTags('Upload File ')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}

  @ApiConsumes('multipart/form-data')
  @Post('single-file')
  @UseInterceptors(
    FastifyFileInterceptor('photo_url', {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  single(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SingleFileDto,
  ) {
    const photo = fileMapper({ file, req });
    return this.uploadFileService.addAvatar(2, {
      path: photo.image_url,
      filename: photo.filename,
      mimetype: photo.mimetype,
    });
  }

  @ApiConsumes('multipart/form-data')
  @Post('multiple-file')
  @UseInterceptors(
    FastifyFilesInterceptor('photo_url', 10, {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  multiple(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: MultipleFileDto,
  ) {
    return { ...body, photo_url: filesMapper({ files, req }) };
  }
}
