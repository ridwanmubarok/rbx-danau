import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetPetsListSchema = z.object({
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
  ownerId: z
    .coerce
    .number()
    .int()
    .positive('Owner ID must be a positive integer')
    .optional()
    .describe('Filter pets by owner ID'),
  rarity: z
    .string()
    .min(1, 'Rarity cannot be empty')
    .max(50, 'Rarity must not exceed 50 characters')
    .optional()
    .describe('Filter pets by rarity level'),
  search: z
    .string()
    .max(50, 'Search term must not exceed 50 characters')
    .optional()
    .describe('Search pets by name (case-insensitive)'),
});

export class GetPetsListDto extends createZodDto(GetPetsListSchema) {}