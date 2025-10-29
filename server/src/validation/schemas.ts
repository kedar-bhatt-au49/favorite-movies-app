import { z } from 'zod';

// Entry validation schemas
export const entrySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  type: z.enum(['MOVIE', 'TV_SHOW'], { required_error: 'Type is required' }),
  director: z.string().min(1, 'Director is required').max(100, 'Director name must be less than 100 characters'),
  budget: z.string().min(1, 'Budget is required'),
  location: z.string().min(1, 'Location is required').max(100, 'Location must be less than 100 characters'),
  duration: z.string().min(1, 'Duration is required'),
  year: z.string().min(1, 'Year is required'),
  description: z.string().optional(),
  posterUrl: z.string().url().optional().or(z.literal(''))
});

export const updateEntrySchema = entrySchema.partial();

export const querySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).optional().default('10'),
  search: z.string().optional(),
  type: z.enum(['MOVIE', 'TV_SHOW']).optional()
});

// Auth validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

export type CreateEntryData = z.infer<typeof entrySchema>;
export type UpdateEntryData = z.infer<typeof updateEntrySchema>;
export type QueryParams = z.infer<typeof querySchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
