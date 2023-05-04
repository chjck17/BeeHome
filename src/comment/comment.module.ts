import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentRepository } from './repositories/comment.repository';

import { CommentCustomerService } from './services/customer/comment.service';
import { CommentCustomerController } from './controllers/customer/comment.customer.controller';
import { Comment } from './entities/comment.entity';
import { CommentToBoardingHouse } from './entities/commentToBoardingHouse.entity';
import { CommentToBoardingHouseRepository } from './repositories/commentToBoardingHouse.repository';
import { BoardingHouseRepository } from '../boarding-house/repositories/boarding-house.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, CommentToBoardingHouse])],
  controllers: [CommentCustomerController],
  providers: [
    CommentRepository,
    CommentCustomerService,
    CommentToBoardingHouseRepository,
    BoardingHouseRepository,
  ],
})
export class CommentModule {}
