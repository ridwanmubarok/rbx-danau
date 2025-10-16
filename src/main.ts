import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException } from '@nestjs/common';
import helmet from 'helmet';
import { Logger, VersioningType } from '@nestjs/common';
import appConfig from './config/app.config';
import cookieParser from 'cookie-parser';
import { swaggerConfig } from '@config/swagger.config';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ZodValidationPipe());
  
  swaggerConfig(app, AppModule.appVersion, AppModule.environment);

  app.use(helmet());
  await app.listen(AppModule.port);
  const logger = new Logger();
  logger.log(`This app running at port ${AppModule.port}`);
}
bootstrap();
