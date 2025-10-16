import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UpdatePetDto } from '../dto/update-pet.dto';

@Injectable()
export class UpdatePetUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, data: UpdatePetDto) {
    // Check if pet exists
    const existingPet = await this.prisma.pet.findUnique({
      where: { id }
    });

    if (!existingPet) {
      throw new Error(`Pet with ID ${id} not found`);
    }

    return this.prisma.pet.update({
      where: { id },
      data: {
        ...(data.petName && { petName: data.petName }),
        ...(data.rarity && { rarity: data.rarity })
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });
  }
}