import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UpdateOrCreateUserDto } from '../dto/update-or-create-user.dto';

@Injectable()
export class UpdateOrCreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: UpdateOrCreateUserDto) {
    const { username } = data;

    // Try to find existing user by username
    const existingUser = await this.prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      // Update existing user
      return this.prisma.user.update({
        where: { username },
        data: {
          // Only update if new data is provided
          ...(data.username && { username: data.username })
        }
      });
    } else {
      // Create new user
      return this.prisma.user.create({
        data: {
          username
        }
      });
    }
  }
}