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
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { successResponse } from 'src/utils/response.utils';
import { UpdateOrCreateUserDto, GetUsersListDto } from './dto';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @Put('update-or-create')
  @HttpCode(HttpStatus.OK)
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
  @ApiResponse({ status: 422, description: 'Validation error' })
  async updateOrCreate(@Body() updateOrCreateUserDto: UpdateOrCreateUserDto) {
    const user = await this.userService.updateOrCreateUser(
      updateOrCreateUserDto,
    );
    return successResponse(user, 'User updated or created successfully');
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get paginated list of users',
    description:
      'Retrieves a paginated list of users with optional search functionality.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10, max: 100)',
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by username (case-insensitive)',
    example: 'john',
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
  @ApiResponse({ status: 422, description: 'Validation error' })
  async getUsersList(@Query() query: GetUsersListDto) {
    const result = await this.userService.getUsersList(query);
    return successResponse(result, 'Users retrieved successfully');
  }

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user by username',
    description:
      'Retrieves detailed information about a user including their notes, statuses, and pets.',
  })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'Username of the user to retrieve',
    example: 'john_doe',
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
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: "User with username 'nonexistent' not found",
      },
    },
  })
  @ApiResponse({ status: 422, description: 'Validation error' })
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }

    return successResponse(user, 'User retrieved successfully');
  }
}
