import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateStatusDto } from '../dto/create-status.dto';
import { BadRequestException } from 'src/common/exceptions/badRequest.exception';

@Injectable()
export class CreateStatusUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateStatusDto) {
    const { userId, description, imageUrl } = data;

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Create new status
    return this.prisma.status.create({
      data: {
        userId,
        description,
        imageUrl
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