import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateStatusUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, data: UpdateStatusDto) {
    const { description, imageUrl } = data;

    // Check if status exists
    const existingStatus = await this.prisma.status.findUnique({
      where: { id }
    });

    if (!existingStatus) {
      throw new NotFoundException('Status not found');
    }

    // Update status
    return this.prisma.status.update({
      where: { id },
      data: {
        ...(description && { description }),
        ...(imageUrl !== undefined && { imageUrl })
      },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });
  }
}