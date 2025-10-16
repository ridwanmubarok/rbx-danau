import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateFeedbackSchema = z.object({
  userId: z
    .number()
    .positive('User ID must be a positive number')
    .describe('The ID of the user providing feedback'),
  type: z
    .enum(['feature_request', 'bug_report', 'general'])
    .describe(
      'Type of feedback: feature request, bug report, or general feedback',
    ),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message must not exceed 1000 characters')
    .describe('The feedback message'),
  rating: z
    .number()
    .int()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .optional()
    .describe('Optional rating from 1 to 5'),
});

export class CreateFeedbackDto extends createZodDto(CreateFeedbackSchema) {}
