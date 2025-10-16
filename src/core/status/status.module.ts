import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusControllerV1 } from './status.controller';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { 
  CreateStatusUseCase,
  UpdateStatusUseCase,
  GetStatusListUseCase,
  GetStatusByIdUseCase,
  DeleteStatusUseCase
} from './use-cases';

@Module({
  controllers: [StatusControllerV1],
  providers: [
    StatusService, 
    PrismaService,
    CreateStatusUseCase,
    UpdateStatusUseCase,
    GetStatusListUseCase,
    GetStatusByIdUseCase,
    DeleteStatusUseCase
  ],
  exports: [StatusService]
})
export class StatusModule {}