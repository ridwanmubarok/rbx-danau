import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreatePetDto } from '../dto/create-pet.dto';

@Injectable()
export class CreatePetUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreatePetDto) {
    // Verify owner exists
    const ownerExists = await this.prisma.user.findUnique({
      where: { id: data.ownerId },
    });

    if (!ownerExists) {
      throw new Error(`User with ID ${data.ownerId} not found`);
    }

    return this.prisma.pet.create({
      data: {
        petName: data.petName,
        rarity: data.rarity,
        ownerId: data.ownerId,
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}
