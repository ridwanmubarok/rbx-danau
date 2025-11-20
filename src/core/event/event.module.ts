import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventControllerV1 } from './event.controller';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  CreateEventUseCase,
  UpdateEventUseCase,
  GetEventListUseCase,
  GetEventByIdUseCase,
  DeleteEventUseCase,
} from './use-cases';

@Module({
  controllers: [EventControllerV1],
  providers: [
    EventService,
    PrismaService,
    CreateEventUseCase,
    UpdateEventUseCase,
    GetEventListUseCase,
    GetEventByIdUseCase,
    DeleteEventUseCase,
  ],
  exports: [EventService],
})
export class EventModule {}
