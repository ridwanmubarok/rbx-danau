import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackControllerV1 } from './feedback.controller';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  CreateFeedbackUseCase,
  GetFeedbacksListUseCase,
  GetFeedbackByIdUseCase,
} from './use-cases';

@Module({
  controllers: [FeedbackControllerV1],
  providers: [
    FeedbackService,
    PrismaService,
    CreateFeedbackUseCase,
    GetFeedbacksListUseCase,
    GetFeedbackByIdUseCase,
  ],
  exports: [FeedbackService],
})
export class FeedbackModule {}
