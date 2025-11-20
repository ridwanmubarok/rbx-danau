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
import { EventService } from './event.service';
import { successResponse } from 'src/utils/response.utils';
import { CreateEventDto, UpdateEventDto, GetEventListDto } from './dto';

@ApiTags('event')
@Controller({ path: 'event', version: '1' })
export class EventControllerV1 {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new event',
    description: 'Creates a new event for a user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Event created successfully',
    schema: {
      example: {
        success: true,
        message: 'Event created successfully',
        data: {
          id: 1,
          userId: 1,
          title: 'Team Meeting',
          description: 'Monthly team sync meeting',
          startDate: '2024-02-01T10:00:00.000Z',
          endDate: '2024-02-01T11:00:00.000Z',
          location: 'Conference Room A',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  async createEvent(@Body() createEventDto: CreateEventDto) {
    const result = await this.eventService.createEvent(createEventDto);
    return successResponse(result, 'Event created successfully');
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get list of events',
    description:
      'Retrieves a paginated list of events with optional filtering.',
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
  @ApiQuery({
    name: 'upcoming',
    required: false,
    type: Boolean,
    description: 'Filter for upcoming events only',
  })
  @ApiResponse({
    status: 200,
    description: 'Events retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Events retrieved successfully',
        data: {
          events: [
            {
              id: 1,
              userId: 1,
              title: 'Team Meeting',
              description: 'Monthly team sync meeting',
              startDate: '2024-02-01T10:00:00.000Z',
              endDate: '2024-02-01T11:00:00.000Z',
              location: 'Conference Room A',
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-01T00:00:00.000Z',
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
  async getEventList(@Query() query: GetEventListDto) {
    const result = await this.eventService.getEventList(query);
    return successResponse(result, 'Events retrieved successfully');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get event by ID',
    description: 'Retrieves a specific event by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Event ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Event retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Event retrieved successfully',
        data: {
          id: 1,
          userId: 1,
          title: 'Team Meeting',
          description: 'Monthly team sync meeting',
          startDate: '2024-02-01T10:00:00.000Z',
          endDate: '2024-02-01T11:00:00.000Z',
          location: 'Conference Room A',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
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
    description: 'Event not found',
  })
  async getEventById(@Param('id') id: string) {
    const result = await this.eventService.getEventById(parseInt(id));
    if (!result) {
      throw new NotFoundException('Event not found');
    }
    return successResponse(result, 'Event retrieved successfully');
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update event',
    description: 'Updates an existing event.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Event ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Event updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Event updated successfully',
        data: {
          id: 1,
          userId: 1,
          title: 'Updated Team Meeting',
          description: 'Updated description',
          startDate: '2024-02-01T10:00:00.000Z',
          endDate: '2024-02-01T12:00:00.000Z',
          location: 'Conference Room B',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Event not found',
  })
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const result = await this.eventService.updateEvent(
      parseInt(id),
      updateEventDto,
    );
    return successResponse(result, 'Event updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete event',
    description: 'Deletes an event by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Event ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Event deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Event deleted successfully',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Event not found',
  })
  async deleteEvent(@Param('id') id: string) {
    await this.eventService.deleteEvent(parseInt(id));
    return successResponse(null, 'Event deleted successfully');
  }
}
