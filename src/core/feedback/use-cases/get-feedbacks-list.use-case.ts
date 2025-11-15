import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { GetFeedbacksListDto } from '../dto/get-feedbacks-list.dto';
import { Prisma } from '../../../../generated/prisma';

@Injectable()
export class GetFeedbacksListUseCase {
  constructor(private readonly prisma: PrismaService) {}
  async execute(query: GetFeedbacksListDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;
    const where: Prisma.FeedbackWhereInput = {};
    if (query.type) {
      where.type = query.type;
    }
    if (query.userId) {
      where.userId = query.userId;
    }
    const [feedbacks, total] = await Promise.all([
      this.prisma.feedback.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }),
      this.prisma.feedback.count({ where }),
    ]);
    return {
      data: feedbacks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
