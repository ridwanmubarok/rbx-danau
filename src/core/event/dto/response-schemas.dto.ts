import { z } from 'zod';

// Event response schema
export const EventResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().nullable(),
  location: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Event with user response schema
export const EventWithUserResponseSchema = EventResponseSchema.extend({
  user: z.object({
    id: z.number(),
    username: z.string(),
  }),
});

// Paginated events response schema
export const PaginatedEventsResponseSchema = z.object({
  events: z.array(EventWithUserResponseSchema),
  pagination: z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    itemsPerPage: z.number(),
  }),
});