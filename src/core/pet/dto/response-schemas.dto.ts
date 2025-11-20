import { z } from 'zod';

// Pet response schema
export const PetResponseSchema = z.object({
  id: z.number(),
  petName: z.string(),
  rarity: z.string(),
  ownerId: z.number(),
  owner: z.object({
    id: z.number(),
    username: z.string(),
  }),
});

// Paginated pets response schema
export const PaginatedPetsResponseSchema = z.object({
  pets: z.array(PetResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

// Base response schema for pets
export const PetBaseResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
});
