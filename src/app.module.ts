import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from 'data-source';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => dataSource,
    }),
    ProductModule,
    CategoryModule,
    AuthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
