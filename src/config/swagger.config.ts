import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const application = {
  title: 'Roblox Danau API Documentation',
  description: 'The Roblox Danau API description',
} as const;

/**
 * Configures Swagger for the provided NestJS application.
 *
 * @param app {INestApplication} - The NestJS application instance.
 * @param apiVersion {string} - Optional version of the API.
 */
export function swaggerConfig(
  app: INestApplication,
  apiVersion: string,
  environment: string,
) {
  const setup = new DocumentBuilder()
    .setTitle(`${application.title} (${environment})`)
    .setDescription(application.description)
    .setVersion(apiVersion)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'Bearer',
    })
    .build();

  // @ts-expect-error - Type mismatch due to pnpm duplicate @nestjs/common in dependency tree
  const document = SwaggerModule.createDocument(app, setup);
  // Mount Swagger at both /api/docs and /api/v{version}/docs
  // @ts-expect-error - Type mismatch due to pnpm duplicate @nestjs/common in dependency tree
  SwaggerModule.setup('docs', app, document);
  // @ts-expect-error - Type mismatch due to pnpm duplicate @nestjs/common in dependency tree
  SwaggerModule.setup(`v${apiVersion}/docs`, app, document);
}
