import { z } from 'zod';

// Base response schema
export const BaseResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
});

// User response schema
export const UserResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  createdAt: z.string().datetime(),
});

// Paginated users response schema
export const PaginatedUsersResponseSchema = z.object({
  users: z.array(UserResponseSchema.extend({
    _count: z.object({
      notes: z.number(),
      statuses: z.number(),
      pets: z.number(),
    })
  })),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

// User with details response schema
export const UserWithDetailsResponseSchema = UserResponseSchema.extend({
  notes: z.array(z.object({
    id: z.number(),
    content: z.string(),
    createdAt: z.string().datetime(),
  })),
  statuses: z.array(z.object({
    id: z.number(),
    description: z.string(),
    imageUrl: z.string().nullable(),
    createdAt: z.string().datetime(),
  })),
  pets: z.array(z.object({
    id: z.number(),
    petName: z.string(),
    rarity: z.string(),
  })),
  _count: z.object({
    notes: z.number(),
    statuses: z.number(),
    pets: z.number(),
  }),
});