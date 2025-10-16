import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetUserByUsernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must not exceed 50 characters')
    .describe('The username of the user to retrieve'),
});

export class GetUserByUsernameDto extends createZodDto(
  GetUserByUsernameSchema,
) {}
