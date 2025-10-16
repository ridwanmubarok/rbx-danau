import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetStatusListSchema = z.object({
  page: z
    .coerce
    .number()
    .int()
    .min(1, 'Page must be at least 1')
    .default(1)
    .optional()
    .describe('Page number for pagination'),
  limit: z
    .coerce
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit must not exceed 100')
    .default(10)
    .optional()
    .describe('Number of items per page'),
  userId: z
    .coerce
    .number()
    .int()
    .positive('User ID must be a positive integer')
    .optional()
    .describe('Filter statuses by user ID'),
});

export class GetStatusListDto extends createZodDto(GetStatusListSchema) {}