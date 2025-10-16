import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: {
        notes: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        statuses: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        pets: {
          orderBy: {
            petName: 'asc',
          },
        },
        _count: {
          select: {
            notes: true,
            statuses: true,
            pets: true,
          },
        },
      },
    });
  }
}
