import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class GetEventByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<unknown> {
    return this.prisma.event.findUnique({
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
