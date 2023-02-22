// import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
// import { EmailService } from './services/email.service';
import { EncryptService } from './services/encrypt.service';
// import { UploadService } from './services/upload-file.service';
import { UuidService } from './services/uuid.service';

@Module({
  imports: [
    // HttpModule
  ],
  providers: [UuidService, EncryptService],
  exports: [UuidService, EncryptService],
})
export class UtilsModule {}
