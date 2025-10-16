import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateOrCreateUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens')
    .describe('The username of the user'),
});

export class UpdateOrCreateUserDto extends createZodDto(UpdateOrCreateUserSchema) {}