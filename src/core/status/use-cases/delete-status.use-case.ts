import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteStatusUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    // Check if status exists
    const existingStatus = await this.prisma.status.findUnique({
      where: { id },
    });

    if (!existingStatus) {
      throw new NotFoundException('Status not found');
    }

    // Delete status
    return this.prisma.status.delete({
      where: { id },
    });
  }
}
