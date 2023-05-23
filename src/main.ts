import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify/adapters';
import { contentParser } from 'fastify-multer';
import { join } from 'path';
import helmet from 'fastify-helmet';

// import * as cookieParser from 'cookie-parser';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 52428800, // 50 MB
      // querystringParser: false,
      maxParamLength: 200, // tăng giới hạn độ dài của các tham số tuyến đường
    }),
  );
  app.enableCors({ origin: '*', credentials: true });
  app.register(contentParser);

  // const path = require('path');

  // app.use(
  //   '/upload/single',
  //   express.static(path.join(__dirname, '..', 'upload', 'single')),
  // );
  app.useStaticAssets({ root: join(__dirname, '..', 'upload', 'single') });
  const config = new DocumentBuilder()
    .setTitle('BeeHome')
    .setDescription('BeeHome API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(+process.env.PORT || 5000, '0.0.0.0');
}
bootstrap();
