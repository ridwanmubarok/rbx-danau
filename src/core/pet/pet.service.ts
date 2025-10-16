import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  CreatePetUseCase,
  UpdatePetUseCase,
  GetPetsListUseCase,
  GetPetByIdUseCase,
  DeletePetUseCase
} from './use-cases';
import {
  CreatePetDto,
  UpdatePetDto,
  GetPetsListDto
} from './dto';

@Injectable()
export class PetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createPetUseCase: CreatePetUseCase,
    private readonly updatePetUseCase: UpdatePetUseCase,
    private readonly getPetsListUseCase: GetPetsListUseCase,
    private readonly getPetByIdUseCase: GetPetByIdUseCase,
    private readonly deletePetUseCase: DeletePetUseCase,
  ) {}

  async createPet(data: CreatePetDto) {
    return this.createPetUseCase.execute(data);
  }

  async updatePet(id: number, data: UpdatePetDto) {
    return this.updatePetUseCase.execute(id, data);
  }

  async getPetsList(query: GetPetsListDto) {
    return this.getPetsListUseCase.execute(query);
  }

  async getPetById(id: number) {
    return this.getPetByIdUseCase.execute(id);
  }

  async deletePet(id: number) {
    return this.deletePetUseCase.execute(id);
  }
}