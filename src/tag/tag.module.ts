import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagRepository } from './repositories/tag.repository';

import { Tag } from './entities/tag.entity';
import { TagLessorController } from './controllers/lessor/tag.lessor.controller';
import { TagLessorService } from './services/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagLessorController],
  providers: [TagRepository, TagLessorService],
})
export class TagModule {}
