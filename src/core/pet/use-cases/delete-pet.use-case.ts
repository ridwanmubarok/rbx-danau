import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class DeletePetUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    // Check if pet exists
    const existingPet = await this.prisma.pet.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!existingPet) {
      throw new Error(`Pet with ID ${id} not found`);
    }

    await this.prisma.pet.delete({
      where: { id },
    });

    return existingPet;
  }
}
