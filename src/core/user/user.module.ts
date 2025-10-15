import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserControllerV1 } from './user.controller';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { 
  UpdateOrCreateUserUseCase,
  GetUsersListUseCase,
  GetUserByUsernameUseCase
} from './use-cases';

@Module({
  controllers: [UserControllerV1],
  providers: [
    UserService, 
    PrismaService,
    UpdateOrCreateUserUseCase,
    GetUsersListUseCase,
    GetUserByUsernameUseCase
  ],
  exports: [UserService]
})
export class UserModule {}
