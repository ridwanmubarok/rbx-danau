import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateStatusSchema = z.object({
  userId: z
    .number()
    .int()
    .positive('User ID must be a positive integer')
    .describe('The ID of the user creating the status'),
  description: z
    .string()
    .min(1, 'Description cannot be empty')
    .max(500, 'Description must not exceed 500 characters')
    .describe('The status description'),
  imageUrl: z
    .string()
    .url('Image URL must be a valid URL')
    .optional()
    .describe('Optional image URL for the status'),
});

export class CreateStatusDto extends createZodDto(CreateStatusSchema) {}