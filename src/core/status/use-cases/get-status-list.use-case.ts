import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { GetStatusListDto } from '../dto/get-status-list.dto';

@Injectable()
export class GetStatusListUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetStatusListDto) {
    const { page = 1, limit = 10, userId } = query;
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where = userId
      ? { userId }
      : {};

    // Get statuses with pagination
    const [statuses, total] = await Promise.all([
      this.prisma.status.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
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
      this.prisma.status.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      statuses,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit
      }
    };
  }
}