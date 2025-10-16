import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  UpdateOrCreateUserUseCase,
  GetUsersListUseCase,
  GetUserByUsernameUseCase,
} from './use-cases';
import { UpdateOrCreateUserDto, GetUsersListDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly updateOrCreateUserUseCase: UpdateOrCreateUserUseCase,
    private readonly getUsersListUseCase: GetUsersListUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
  ) {}

  async updateOrCreateUser(data: UpdateOrCreateUserDto) {
    return this.updateOrCreateUserUseCase.execute(data);
  }

  async getUsersList(query: GetUsersListDto) {
    return this.getUsersListUseCase.execute(query);
  }

  async getUserByUsername(username: string) {
    return this.getUserByUsernameUseCase.execute(username);
  }
}
