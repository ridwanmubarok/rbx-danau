import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { StatusService } from './status.service';
import { successResponse } from 'src/utils/response.utils';
import { CreateStatusDto, UpdateStatusDto, GetStatusListDto } from './dto';

@ApiTags('status')
@Controller({ path: 'status', version: '1' })
export class StatusControllerV1 {
  constructor(private readonly statusService: StatusService) {}

  @Post('create')
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
  async createStatus(@Body() createStatusDto: CreateStatusDto) {
    const result = await this.statusService.createStatus(createStatusDto);
    return successResponse(result, 'Status created successfully');
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get list of statuses',
    description: 'Retrieves a paginated list of statuses with optional filtering.',
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
    return successResponse(result, 'Statuses retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get status by ID',
    description: 'Retrieves a specific status by its ID.',
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
  async getStatusById(@Param('id') id: string) {
    const result = await this.statusService.getStatusById(parseInt(id));
    if (!result) {
      throw new NotFoundException('Status not found');
    }
    return successResponse(result, 'Status retrieved successfully');
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update status',
    description: 'Updates an existing status.',
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
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const result = await this.statusService.updateStatus(
      parseInt(id),
      updateStatusDto,
    );
    return successResponse(result, 'Status updated successfully');
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete status',
    description: 'Deletes a status by its ID.',
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
  async deleteStatus(@Param('id') id: string) {
    await this.statusService.deleteStatus(parseInt(id));
    return successResponse(null, 'Status deleted successfully');
  }
}