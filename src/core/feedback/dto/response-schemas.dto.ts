import { z } from 'zod';

export const FeedbackResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  type: z.enum(['feature_request', 'bug_report', 'general']),
  message: z.string(),
  rating: z.number().nullable(),
  createdAt: z.date(),
});

export const FeedbacksListResponseSchema = z.object({
  data: z.array(FeedbackResponseSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});
