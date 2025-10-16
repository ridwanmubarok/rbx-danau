import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class GetPetByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    if (!pet) {
      throw new Error(`Pet with ID ${id} not found`);
    }

    return pet;
  }
}