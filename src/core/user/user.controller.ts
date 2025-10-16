import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { successResponse } from 'src/utils/response.utils';
import { UpdateOrCreateUserDto, GetUsersListDto } from './dto';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @Put('update-or-create')
  @ApiOperation({
    summary: 'Update existing user or create new one',
    description:
      'Updates an existing user by username, or creates a new user if username does not exist.',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated or created successfully',
    schema: {
      example: {
        success: true,
        message: 'User updated or created successfully',
        data: {
          id: 1,
          username: 'john_doe',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  })
  async updateOrCreate(@Body() updateOrCreateUserDto: UpdateOrCreateUserDto) {
    const user = await this.userService.updateOrCreateUser(
      updateOrCreateUserDto,
    );
    return successResponse(user, 'User updated or created successfully');
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get paginated list of users',
    description:
      'Retrieves a paginated list of users with optional search functionality.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Users retrieved successfully',
        data: {
          users: [
            {
              id: 1,
              username: 'john_doe',
              createdAt: '2024-01-01T00:00:00.000Z',
              _count: {
                notes: 5,
                statuses: 3,
                pets: 2,
              },
            },
          ],
          total: 25,
          page: 1,
          limit: 10,
          totalPages: 3,
        },
      },
    },
  })
  async getUsersList(@Query() query: GetUsersListDto) {
    const result = await this.userService.getUsersList(query);
    return successResponse(result, 'Users retrieved successfully');
  }

  @Get(':username')
  @ApiOperation({
    summary: 'Get user by username',
    description:
      'Retrieves detailed information about a user including their notes, statuses, and pets.',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'User retrieved successfully',
        data: {
          id: 1,
          username: 'john_doe',
          createdAt: '2024-01-01T00:00:00.000Z',
          notes: [],
          statuses: [],
          pets: [],
          _count: {
            notes: 0,
            statuses: 0,
            pets: 0,
          },
        },
      },
    },
  })
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }

    return successResponse(user, 'User retrieved successfully');
  }
}
