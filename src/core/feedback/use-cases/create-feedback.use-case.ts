import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';

@Injectable()
export class CreateFeedbackUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateFeedbackDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.feedback.create({
      data: {
        userId: data.userId,
        type: data.type,
        message: data.message,
        rating: data.rating,
      },
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
