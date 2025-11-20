import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateStatusSchema = z.object({
  description: z
    .string()
    .min(1, 'Description cannot be empty')
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .describe('The status description'),
  imageUrl: z
    .string()
    .url('Image URL must be a valid URL')
    .nullable()
    .optional()
    .describe('Optional image URL for the status'),
});

export class UpdateStatusDto extends createZodDto(UpdateStatusSchema) {}
