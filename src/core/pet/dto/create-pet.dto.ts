import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';


export const CreatePetSchema = z.object({
  petName: z
    .string()
    .min(1, 'Pet name cannot be empty')
    .max(50, 'Pet name must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9\s_-]+$/, 'Pet name can only contain letters, numbers, spaces, underscores, and hyphens')
    .describe('The name of the pet'),
  rarity: z
    .string()
    .min(1, 'Rarity cannot be empty')
    .max(50, 'Rarity must not exceed 50 characters')
    .describe('The rarity level of the pet'),
  ownerId: z
    .number()
    .int()
    .positive('Owner ID must be a positive integer')
    .describe('The ID of the user who owns this pet'),
});

export class CreatePetDto extends createZodDto(CreatePetSchema) {}