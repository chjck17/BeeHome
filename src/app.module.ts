import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from 'data-source';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { AuthModule } from './auth/auth.module';
import globalConfig from './common/config/global.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [globalConfig], cache: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        initializeTransactionalContext();
        return addTransactionalDataSource(dataSource);
      },
    }),
    AuthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
