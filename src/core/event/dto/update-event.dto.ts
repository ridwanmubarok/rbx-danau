import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateEventSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(200, 'Title must not exceed 200 characters')
    .optional()
    .describe('The event title'),
  description: z
    .string()
    .max(1000, 'Description must not exceed 1000 characters')
    .nullable()
    .optional()
    .describe('Optional event description'),
  startDate: z
    .string()
    .datetime('Start date must be a valid ISO 8601 datetime')
    .or(z.date())
    .optional()
    .describe('The start date and time of the event'),
  endDate: z
    .string()
    .datetime('End date must be a valid ISO 8601 datetime')
    .or(z.date())
    .nullable()
    .optional()
    .describe('Optional end date and time of the event'),
  location: z
    .string()
    .max(200, 'Location must not exceed 200 characters')
    .nullable()
    .optional()
    .describe('Optional event location'),
});

export class UpdateEventDto extends createZodDto(UpdateEventSchema) {}