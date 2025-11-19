import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { GetEventListDto } from '../dto/get-event-list.dto';

@Injectable()
export class GetEventListUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetEventListDto) {
    const { page = 1, limit = 10, userId, upcoming } = query;
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where: any = {};
    
    if (userId) {
      where.userId = userId;
    }

    if (upcoming) {
      where.startDate = {
        gte: new Date()
      };
    }

    // Get events with pagination
    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          startDate: 'asc'
        },
        include: {
          user: {
            select: {
              id: true,
              username: true
            }
          }
        }
      }),
      this.prisma.event.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      events,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit
      }
    };
  }
}