import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class GetStatusByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    return this.prisma.status.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}
