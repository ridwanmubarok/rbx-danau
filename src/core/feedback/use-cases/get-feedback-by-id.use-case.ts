import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class GetFeedbackByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}
  async execute(id: number) {
    const feedback = await this.prisma.feedback.findUnique({
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
    if (!feedback) {
      throw new Error('Feedback not found');
    }
    return feedback;
  }
}
