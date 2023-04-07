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
import { CategoryModule } from './category/category.module';
import { AllExceptionsFilter } from './common/filters/all.filter';
import dayjs from 'dayjs';
import { TagModule } from './tag/tag.module';
import { FloorModule } from './floor/floor.module';
import { RoomModule } from './room/room.module';

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
    CategoryModule,
    TagModule,
    FloorModule,
    RoomModule,
  ],

  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule implements OnModuleInit {
  constructor() {}
  async onModuleInit() {
    await dataSource.query('CREATE extension IF NOT EXISTS pgcrypto');
    // dayjs.extend(utc);
    // dayjs.extend(timezone);
    // dayjs.tz.setDefault(TIME_ZONE);
  }
}
