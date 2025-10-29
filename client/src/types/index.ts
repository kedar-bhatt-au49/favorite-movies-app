export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Entry {
  id: string;
  title: string;
  type: 'MOVIE' | 'TV_SHOW';
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
  description?: string;
  posterUrl?: string;
  createdAt: string;
  updatedAt: string;
  user?: Pick<User, 'id' | 'name' | 'email'>;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  hasMore: boolean;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}

export interface EntriesResponse {
  entries: Entry[];
  pagination: PaginationInfo;
}

export interface AuthResponse {
  user: User;
  token: string;
}
