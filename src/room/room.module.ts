import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './repositories/room.repository';
import { RoomAttributeDetailRepository } from './repositories/room-attribute-detail.repository';
import { RoomAttributeRepository } from './repositories/room-attribute.repository';
import { RoomAttributeTermDetailRepository } from './repositories/room-attribute-term-detail.repository';
import { RoomAttributeTermRepository } from './repositories/room-attribute-term.repository';
import { RoomToAttributeRepository } from './repositories/room-to-attribute.repository';
import { Room } from './entities/room.entity';
import { RoomAttribute } from './entities/room-attribute.entity';
import { RoomAttributeDetail } from './entities/room-attribute-detail.entity';
import { RoomAttributeTerm } from './entities/room-attribute-term.entity';
import { RoomAttributeTermDetail } from './entities/room-attribute-term-detail.entity';
import { RoomToAttribute } from './entities/room-to-attribute.entity';
import { RoomLessorService } from './services/lessor/room.lessor.service';
import { RoomAttributeLessorService } from './services/lessor/room-attribute.lessor.service';
import { RoomAttributeLessorController } from './controllers/lessor/room-attribute.lessor.controller';
import { RoomImageRepository } from './repositories/room-image.repository';
import { RoomLessorController } from './controllers/lessor/room.lessor.controller';
import { UploadFileService } from '../upload-file/upload-file.service';
import LocalFilesService from '../local-file/local-file.service';
import { LocalFileRepository } from '../local-file/local-file.repository';
import { UserRepository } from 'src/auth/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room,
      RoomAttribute,
      RoomAttributeDetail,
      RoomAttributeTerm,
      RoomAttributeTermDetail,
      RoomToAttribute,
    ]),
  ],
  controllers: [RoomAttributeLessorController, RoomLessorController],
  providers: [
    RoomRepository,
    RoomLessorService,
    RoomAttributeLessorService,
    RoomAttributeRepository,
    RoomAttributeDetailRepository,
    RoomAttributeTermDetailRepository,
    RoomAttributeTermRepository,
    RoomImageRepository,
    UploadFileService,
    LocalFileRepository,
    RoomToAttributeRepository,
    UserRepository,
    LocalFilesService,
  ],
})
export class RoomModule {}
