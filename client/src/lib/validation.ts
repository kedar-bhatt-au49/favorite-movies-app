import { z } from 'zod';
import { VALIDATION } from '../config/constants';

// Entry form validation schema
export const entryFormSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(VALIDATION.TITLE_MAX_LENGTH, `Title must be less than ${VALIDATION.TITLE_MAX_LENGTH} characters`),
  type: z.enum(['MOVIE', 'TV_SHOW'], { required_error: 'Type is required' }),
  director: z.string()
    .min(1, 'Director is required')
    .max(VALIDATION.DIRECTOR_MAX_LENGTH, `Director name must be less than ${VALIDATION.DIRECTOR_MAX_LENGTH} characters`),
  genre: z.string().min(1, 'Genre is required'),
  rating: z.coerce.number().min(0, 'Rating must be 0 or higher').max(10, 'Rating must be 10 or lower').optional(),
  budget: z.string().min(1, 'Budget is required'),
  location: z.string()
    .min(1, 'Location is required')
    .max(VALIDATION.LOCATION_MAX_LENGTH, `Location must be less than ${VALIDATION.LOCATION_MAX_LENGTH} characters`),
  duration: z.string().min(1, 'Duration is required'),
  year: z.string().min(1, 'Year is required'),
  description: z.string().optional(),
  posterUrl: z.string().url('Invalid URL format').optional().or(z.literal(''))
});

// Auth validation schemas
export const registerFormSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`),
  name: z.string()
    .min(1, 'Name is required')
    .max(VALIDATION.NAME_MAX_LENGTH, `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`)
});

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

// Export types
export type EntryFormData = z.infer<typeof entryFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
