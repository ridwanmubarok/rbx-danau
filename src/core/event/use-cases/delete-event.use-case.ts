import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteEventUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<unknown> {
    // Check if event exists
    const existingEvent = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }

    // Delete event
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
