import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { UserModule } from './core/user/user.module';
import { FeedbackModule } from './core/feedback/feedback.module';
import { StatusModule } from './core/status/status.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CorsMiddleware } from './common/middleware/cors.middleware';
import { NoteModule } from './core/note/note.module';
import { StaticTokenAuthMiddleware } from './common/middleware/static-token-auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    UserModule,
    FeedbackModule,
    StatusModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  static port: number;
  static appVersion: string;
  static appPrefix: string;
  static environment: string;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('APP_PORT', '3333');
    AppModule.appVersion = this.configService.get('APP_VERSION', '1');
    AppModule.appPrefix = this.configService.get('APP_PREFIX', 'api');
    AppModule.environment = this.configService.get('NODE_ENV', 'development');
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, CorsMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(StaticTokenAuthMiddleware).forRoutes({
      path: '/api/*',
      method: RequestMethod.ALL,
    });
  }
}
