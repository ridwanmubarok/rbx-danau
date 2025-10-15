import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { Logger, VersioningType } from '@nestjs/common';
import appConfig from './config/app.config';
import cookieParser from 'cookie-parser';
import { swaggerConfig } from '@config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((err) => ({
          field: err.property,
          messages: Object.values(err.constraints || {}),
        }));

        return new UnprocessableEntityException({
          statusCode: 422,
          message: 'Validation Error',
          data: null,
          errors: {
            name: 'VALIDATION_ERROR',
            message: null,
            validationErrors: formattedErrors,
          },
        });
      },
    }),
  );
  
  swaggerConfig(app, AppModule.appVersion, AppModule.environment);

  app.use(helmet());
  await app.listen(AppModule.port);
  const logger = new Logger();
  logger.log(`This app running at port ${AppModule.port}`);
}
bootstrap();
