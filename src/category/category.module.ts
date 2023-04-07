import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryLessorController } from './controllers/lessor/category.lessor.controller';
import { CategoryLessorService } from './services/lessor/category.lessor.service';
import { CategoryTypeLessorService } from './services/lessor/categoryType.lessor.service';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryTypeRepository } from './repositories/category-type.repository';
import { CategoryDetailRepository } from './repositories/category-detail.repository';
import { CategoryTypeDetailRepository } from './repositories/category-type-detail.repository';
import { CategoryDetail } from './entities/category-detail.entity';
import { CategoryType } from './entities/category-type.entity';
import { CategoryTypeDetail } from './entities/category-type-detail.entity';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from 'src/common/config/global.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      CategoryDetail,
      CategoryType,
      CategoryTypeDetail,
    ]),
  ],
  controllers: [CategoryLessorController],
  providers: [
    CategoryLessorService,
    CategoryTypeLessorService,
    CategoryRepository,
    CategoryTypeRepository,
    CategoryDetailRepository,
    CategoryTypeDetailRepository,
  ],
})
export class CategoryModule {
  constructor(private configService: ConfigService<GlobalConfig>) {}
}
