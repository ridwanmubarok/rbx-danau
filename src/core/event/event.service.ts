import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  CreateEventUseCase,
  UpdateEventUseCase,
  GetEventListUseCase,
  GetEventByIdUseCase,
  DeleteEventUseCase,
} from './use-cases';
import { CreateEventDto, UpdateEventDto, GetEventListDto } from './dto';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly updateEventUseCase: UpdateEventUseCase,
    private readonly getEventListUseCase: GetEventListUseCase,
    private readonly getEventByIdUseCase: GetEventByIdUseCase,
    private readonly deleteEventUseCase: DeleteEventUseCase,
  ) {}

  async createEvent(data: CreateEventDto): Promise<unknown> {
    return this.createEventUseCase.execute(data);
  }

  async updateEvent(id: number, data: UpdateEventDto): Promise<unknown> {
    return this.updateEventUseCase.execute(id, data);
  }

  async getEventList(query: GetEventListDto): Promise<unknown> {
    return this.getEventListUseCase.execute(query);
  }

  async getEventById(id: number): Promise<unknown> {
    return this.getEventByIdUseCase.execute(id);
  }

  async deleteEvent(id: number): Promise<unknown> {
    return this.deleteEventUseCase.execute(id);
  }
}
