import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './repositories/room.repository';
import { RoomAttributeDetailRepository } from './repositories/room-attribute-detail.repository';
import { RoomAttributeRepository } from './repositories/room-attribute.repository';
import { RoomAttributeTermDetailRepository } from './repositories/room-attribute-term-detail.repository';
import { RoomAttributeTermRepository } from './repositories/room-attribute-term.repository';
import { RoomToAttributeRepository } from './repositories/room-to-attribute.repository';
import { RoomToCategoryRepository } from './repositories/room-to-category.repository';
import { Room } from './entities/room.entity';
import { RoomAttribute } from './entities/room-attribute.entity';
import { RoomAttributeDetail } from './entities/room-attribute-detail.entity';
import { RoomAttributeTerm } from './entities/room-attribute-term.entity';
import { RoomAttributeTermDetail } from './entities/room-attribute-term-detail.entity';
import { RoomToAttribute } from './entities/room-to-attribute.entity';
import { RoomToCategory } from './entities/room-to-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room,
      RoomAttribute,
      RoomAttributeDetail,
      RoomAttributeTerm,
      RoomAttributeTermDetail,
      RoomToAttribute,
      RoomToCategory,
    ]),
  ],
  controllers: [],
  providers: [
    RoomRepository,
    RoomAttributeRepository,
    RoomAttributeDetailRepository,
    RoomAttributeTermDetailRepository,
    RoomAttributeTermRepository,
    RoomToAttributeRepository,
    RoomToCategoryRepository,
  ],
})
export class RoomModule {}
