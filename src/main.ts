import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// import * as cookieParser from 'cookie-parser';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieParser());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
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
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
