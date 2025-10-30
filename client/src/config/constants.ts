// API Configuration
export const API_BASE_URL = '/api';

// App Configuration
export const APP_NAME = 'Medianalytiq';
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
