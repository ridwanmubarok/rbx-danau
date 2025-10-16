import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetFeedbacksListSchema = z.object({
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Page must be a positive number')
    .optional()
    .default(1)
    .describe('Page number for pagination'),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 100, 'Limit must be between 1 and 100')
    .optional()
    .default(10)
    .describe('Number of items per page'),
  type: z
    .enum(['feature_request', 'bug_report', 'general'])
    .optional()
    .describe('Filter by feedback type'),
  userId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'User ID must be a positive number')
    .optional()
    .describe('Filter by user ID'),
});

export class GetFeedbacksListDto extends createZodDto(GetFeedbacksListSchema) {}
