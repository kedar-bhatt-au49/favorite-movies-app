import api from '../lib/api';
import { AuthResponse, ApiResponse, User } from '../types';
import { LoginFormData, RegisterFormData } from '../lib/validation';

export const authApi = {
  // Register new user
  register: async (userData: RegisterFormData): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    return data.data;
  },

  // Login user
  login: async (credentials: LoginFormData): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return data.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<ApiResponse<User>>('/auth/me');
    return data.data;
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};
