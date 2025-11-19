import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UpdateEventDto } from '../dto/update-event.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateEventUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, data: UpdateEventDto) {
    // Check if event exists
    const existingEvent = await this.prisma.event.findUnique({
      where: { id }
    });

    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }

    // Convert dates to Date if they're strings
    const updateData: any = { ...data };
    if (data.startDate) {
      updateData.startDate = typeof data.startDate === 'string' 
        ? new Date(data.startDate) 
        : data.startDate;
    }
    if (data.endDate !== undefined) {
      updateData.endDate = data.endDate 
        ? (typeof data.endDate === 'string' ? new Date(data.endDate) : data.endDate)
        : null;
    }

    // Update event
    return this.prisma.event.update({
      where: { id },
      data: updateData,
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