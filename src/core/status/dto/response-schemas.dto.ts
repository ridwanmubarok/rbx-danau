import { z } from 'zod';

// Status response schema
export const StatusResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  description: z.string(),
  imageUrl: z.string().nullable(),
  createdAt: z.string().datetime(),
});

// Status with user response schema
export const StatusWithUserResponseSchema = StatusResponseSchema.extend({
  user: z.object({
    id: z.number(),
    username: z.string(),
  }),
});

// Paginated statuses response schema
export const PaginatedStatusesResponseSchema = z.object({
  statuses: z.array(StatusWithUserResponseSchema),
  pagination: z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    itemsPerPage: z.number(),
  }),
});
