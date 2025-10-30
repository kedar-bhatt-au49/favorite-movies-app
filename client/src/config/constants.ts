// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.origin + '/api') || 
  'http://localhost:5000/api';

// App Configuration
export const APP_NAME = 'Favorite Movies & TV Shows';
export const ITEMS_PER_PAGE = 10;

// Validation constraints
export const VALIDATION = {
  TITLE_MAX_LENGTH: 200,
  DIRECTOR_MAX_LENGTH: 100,
  LOCATION_MAX_LENGTH: 100,
  NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 6,
} as const;

// Entry types
export const ENTRY_TYPES = [
  { value: 'MOVIE', label: 'Movie' },
  { value: 'TV_SHOW', label: 'TV Show' }
] as const;
