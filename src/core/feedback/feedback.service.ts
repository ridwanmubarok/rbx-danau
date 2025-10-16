import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  CreateFeedbackUseCase,
  GetFeedbacksListUseCase,
  GetFeedbackByIdUseCase,
} from './use-cases';
import { CreateFeedbackDto, GetFeedbacksListDto } from './dto';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createFeedbackUseCase: CreateFeedbackUseCase,
    private readonly getFeedbacksListUseCase: GetFeedbacksListUseCase,
    private readonly getFeedbackByIdUseCase: GetFeedbackByIdUseCase,
  ) {}

  async createFeedback(data: CreateFeedbackDto) {
    return this.createFeedbackUseCase.execute(data);
  }

  async getFeedbacksList(query: GetFeedbacksListDto) {
    return this.getFeedbacksListUseCase.execute(query);
  }

  async getFeedbackById(id: number) {
    return this.getFeedbackByIdUseCase.execute(id);
  }
}
