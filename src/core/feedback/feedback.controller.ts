import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { successResponse } from 'src/utils/response.utils';
import { CreateFeedbackDto, GetFeedbacksListDto } from './dto';

@ApiTags('feedback')
@ApiBearerAuth()
@Controller({ path: 'feedback', version: '1' })
export class FeedbackControllerV1 {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new feedback',
    description:
      'Creates a new feedback entry. Can be a feature request, bug report, or general feedback.',
  })
  @ApiResponse({
    status: 201,
    description: 'Feedback created successfully',
    schema: {
      example: {
        success: true,
        message: 'Feedback created successfully',
        data: {
          id: 1,
          userId: 1,
          type: 'feature_request',
          message: 'Would love to see dark mode added to the app',
          rating: 5,
          createdAt: '2024-01-01T00:00:00.000Z',
          user: {
            id: 1,
            username: 'john_doe',
          },
        },
      },
    },
  })
  async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    try {
      const feedback =
        await this.feedbackService.createFeedback(createFeedbackDto);
      return successResponse(feedback, 'Feedback created successfully');
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'User not found') {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get paginated list of feedbacks',
    description:
      'Retrieves a paginated list of feedbacks with optional filtering by type and userId.',
  })
  @ApiResponse({
    status: 200,
    description: 'Feedbacks retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Feedbacks retrieved successfully',
        data: {
          data: [
            {
              id: 1,
              userId: 1,
              type: 'feature_request',
              message: 'Would love to see dark mode',
              rating: 5,
              createdAt: '2024-01-01T00:00:00.000Z',
              user: {
                id: 1,
                username: 'john_doe',
              },
            },
          ],
          meta: {
            total: 25,
            page: 1,
            limit: 10,
            totalPages: 3,
          },
        },
      },
    },
  })
  async getFeedbacksList(@Query() query: GetFeedbacksListDto) {
    const result = await this.feedbackService.getFeedbacksList(query);
    return successResponse(result, 'Feedbacks retrieved successfully');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get feedback by ID',
    description: 'Retrieves detailed information about a specific feedback.',
  })
  @ApiResponse({
    status: 200,
    description: 'Feedback retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Feedback retrieved successfully',
        data: {
          id: 1,
          userId: 1,
          type: 'feature_request',
          message: 'Would love to see dark mode',
          rating: 5,
          createdAt: '2024-01-01T00:00:00.000Z',
          user: {
            id: 1,
            username: 'john_doe',
          },
        },
      },
    },
  })
  async getFeedbackById(@Param('id', ParseIntPipe) id: number) {
    try {
      const feedback = await this.feedbackService.getFeedbackById(id);
      return successResponse(feedback, 'Feedback retrieved successfully');
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Feedback not found') {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
