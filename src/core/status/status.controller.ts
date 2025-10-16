import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
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
import { StatusService } from './status.service';
import { successResponse } from 'src/utils/response.utils';
import { CreateStatusDto, UpdateStatusDto, GetStatusListDto } from './dto';

@ApiTags('status')
@Controller({ path: 'status', version: '1' })
export class StatusControllerV1 {
  constructor(private readonly statusService: StatusService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new status',
    description: 'Creates a new status for a user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Status created successfully',
    schema: {
      example: {
        success: true,
        message: 'Status created successfully',
        data: {
          id: 1,
          userId: 1,
          description: 'Feeling great today!',
          imageUrl: 'https://example.com/image.jpg',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  async createStatus(@Body() createStatusDto: CreateStatusDto) {
    const result = await this.statusService.createStatus(createStatusDto);
    return successResponse('Status created successfully', result);
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get list of statuses',
    description: 'Retrieves a paginated list of statuses with optional filtering.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    type: Number,
    description: 'Filter by user ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Statuses retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Statuses retrieved successfully',
        data: {
          statuses: [
            {
              id: 1,
              userId: 1,
              description: 'Feeling great today!',
              imageUrl: 'https://example.com/image.jpg',
              createdAt: '2024-01-01T00:00:00.000Z',
              user: {
                id: 1,
                username: 'john_doe',
              },
            },
          ],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 1,
            itemsPerPage: 10,
          },
        },
      },
    },
  })
  async getStatusList(@Query() query: GetStatusListDto) {
    const result = await this.statusService.getStatusList(query);
    return successResponse('Statuses retrieved successfully', result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get status by ID',
    description: 'Retrieves a specific status by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Status ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Status retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Status retrieved successfully',
        data: {
          id: 1,
          userId: 1,
          description: 'Feeling great today!',
          imageUrl: 'https://example.com/image.jpg',
          createdAt: '2024-01-01T00:00:00.000Z',
          user: {
            id: 1,
            username: 'john_doe',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Status not found',
  })
  async getStatusById(@Param('id') id: string) {
    const result = await this.statusService.getStatusById(parseInt(id));
    if (!result) {
      throw new NotFoundException('Status not found');
    }
    return successResponse('Status retrieved successfully', result);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update status',
    description: 'Updates an existing status.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Status ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Status updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Status updated successfully',
        data: {
          id: 1,
          userId: 1,
          description: 'Updated status description',
          imageUrl: 'https://example.com/new-image.jpg',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Status not found',
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const result = await this.statusService.updateStatus(
      parseInt(id),
      updateStatusDto,
    );
    return successResponse('Status updated successfully', result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete status',
    description: 'Deletes a status by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Status ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Status deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Status deleted successfully',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Status not found',
  })
  async deleteStatus(@Param('id') id: string) {
    await this.statusService.deleteStatus(parseInt(id));
    return successResponse('Status deleted successfully', null);
  }
}