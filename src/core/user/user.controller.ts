import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Query, 
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException 
} from '@nestjs/common';
import { UserService } from './user.service';
import { successResponse } from 'src/utils/response.utils';
import { 
  UpdateOrCreateUserDto,
  GetUsersListDto 
} from './dto';

@Controller({ path: 'user', version: '1' })
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @Put('update-or-create')
  @HttpCode(HttpStatus.OK)
  async updateOrCreate(@Body() updateOrCreateUserDto: UpdateOrCreateUserDto) {
    const user = await this.userService.updateOrCreateUser(updateOrCreateUserDto);
    return successResponse(user, 'User updated or created successfully');
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getUsersList(@Query() query: GetUsersListDto) {
    const result = await this.userService.getUsersList(query);
    return successResponse(result, 'Users retrieved successfully');
  }

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);
    
    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }

    return successResponse(user, 'User retrieved successfully');
  }
}
