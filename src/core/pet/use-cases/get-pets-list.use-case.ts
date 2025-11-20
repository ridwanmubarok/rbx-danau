import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { GetPetsListDto } from '../dto/get-pets-list.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class GetPetsListUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetPetsListDto) {
    const { page = 1, limit = 10, ownerId, rarity, search } = query;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.PetWhereInput = {};

    if (ownerId) {
      where.ownerId = ownerId;
    }

    if (rarity) {
      where.rarity = rarity;
    }

    if (search) {
      where.petName = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Get pets with pagination
    const [pets, total] = await Promise.all([
      this.prisma.pet.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          petName: 'asc',
        },
        include: {
          owner: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }),
      this.prisma.pet.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      pets,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
