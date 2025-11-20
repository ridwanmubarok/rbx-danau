import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdatePetSchema = z.object({
  petName: z
    .string()
    .min(1, 'Pet name cannot be empty')
    .max(50, 'Pet name must not exceed 50 characters')
    .regex(
      /^[a-zA-Z0-9\s_-]+$/,
      'Pet name can only contain letters, numbers, spaces, underscores, and hyphens',
    )
    .optional()
    .describe('The updated name of the pet'),
  rarity: z
    .string()
    .min(1, 'Rarity cannot be empty')
    .max(50, 'Rarity must not exceed 50 characters')
    .optional()
    .describe('The updated rarity level of the pet'),
});

export class UpdatePetDto extends createZodDto(UpdatePetSchema) {}
