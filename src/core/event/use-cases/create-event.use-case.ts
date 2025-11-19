import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { BadRequestException } from 'src/common/exceptions/badRequest.exception';

@Injectable()
export class CreateEventUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateEventDto) {
    const { userId, title, description, startDate, endDate, location } = data;

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Convert dates to Date if they're strings
    const parsedStartDate = typeof startDate === 'string' 
      ? new Date(startDate) 
      : startDate;
    
    const parsedEndDate = endDate 
      ? (typeof endDate === 'string' ? new Date(endDate) : endDate)
      : undefined;

    // Create new event
    return this.prisma.event.create({
      data: {
        userId,
        title,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        location
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