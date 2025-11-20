import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetControllerV1 } from './pet.controller';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  CreatePetUseCase,
  UpdatePetUseCase,
  GetPetsListUseCase,
  GetPetByIdUseCase,
  DeletePetUseCase,
} from './use-cases';

@Module({
  controllers: [PetControllerV1],
  providers: [
    PetService,
    PrismaService,
    CreatePetUseCase,
    UpdatePetUseCase,
    GetPetsListUseCase,
    GetPetByIdUseCase,
    DeletePetUseCase,
  ],
  exports: [PetService],
})
export class PetModule {}
