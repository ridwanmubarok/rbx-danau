import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  CreateStatusUseCase,
  UpdateStatusUseCase,
  GetStatusListUseCase,
  GetStatusByIdUseCase,
  DeleteStatusUseCase,
} from './use-cases';
import { CreateStatusDto, UpdateStatusDto, GetStatusListDto } from './dto';

@Injectable()
export class StatusService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createStatusUseCase: CreateStatusUseCase,
    private readonly updateStatusUseCase: UpdateStatusUseCase,
    private readonly getStatusListUseCase: GetStatusListUseCase,
    private readonly getStatusByIdUseCase: GetStatusByIdUseCase,
    private readonly deleteStatusUseCase: DeleteStatusUseCase,
  ) {}

  async createStatus(data: CreateStatusDto) {
    return this.createStatusUseCase.execute(data);
  }

  async updateStatus(id: number, data: UpdateStatusDto) {
    return this.updateStatusUseCase.execute(id, data);
  }

  async getStatusList(query: GetStatusListDto) {
    return this.getStatusListUseCase.execute(query);
  }

  async getStatusById(id: number) {
    return this.getStatusByIdUseCase.execute(id);
  }

  async deleteStatus(id: number) {
    return this.deleteStatusUseCase.execute(id);
  }
}
