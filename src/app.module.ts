import * as Joi from '@hapi/joi';
import { Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from 'data-source';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { AuthModule } from './auth/auth.module';
import globalConfig from './common/config/global.config';
import { CaslModule } from './casl/casl.module';
import { AllExceptionsFilter } from './common/filters/all.filter';
import dayjs from 'dayjs';
import { FloorModule } from './floor/floor.module';
import { RoomModule } from './room/room.module';
import { LocalFilesModule } from './local-file/local-file.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { ProvinceModule } from './province/province.module';
import { BoardingHouseModule } from './boarding-house/boarding-house.module';
import { CommentModule } from './comment/comment.module';
import { BookModule } from './book/book.module';
import { EmailConfirmationModule } from './emailConfirmation/emailConfirmation.module';
import { EmailModule } from './email/email.module';
import { PredictBoardingHouseLessorModule } from './predict/predict.module';
import { ServicePackModule } from './service-pack/service-pack.module';
import { VNPayModule } from './vnpay/vnpay.module';
import { ReportModule } from './report/report.module';
import { ServicePackLessorService } from './service-pack/services/service-pack.lessor.service';
import { ServicePackRepository } from './service-pack/repositories/service-pack.repository';
import { UserRepository } from './auth/repositories/user.repository';
import { LessorRepository } from './auth/repositories/lessor.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        initializeTransactionalContext();
        return addTransactionalDataSource(dataSource);
      },
    }),
    AuthModule,
    CaslModule,
    FloorModule,
    RoomModule,
    LocalFilesModule,
    UploadFileModule,
    ProvinceModule,
    BoardingHouseModule,
    CommentModule,
    BookModule,
    EmailConfirmationModule,
    PredictBoardingHouseLessorModule,
    EmailModule,
    ServicePackModule,
    VNPayModule,
    ReportModule,
  ],

  controllers: [],
  providers: [
    ServicePackRepository,
    UserRepository,
    ServicePackLessorService,
    LessorRepository,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {
  constructor(
    private readonly servicePackLessorService: ServicePackLessorService,
  ) {
    // Bắt đầu kiểm tra định kỳ khi ứng dụng khởi động
    this.servicePackLessorService.startNotificationChecking();
  }
}
