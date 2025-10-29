import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../services/auth';
import { User } from '../types';
import toast from 'react-hot-toast';

// Query keys
export const authKeys = {
  user: ['auth', 'user'] as const,
};

// Get current user
export const useUser = () => {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: authApi.getCurrentUser,
    enabled: !!localStorage.getItem('auth_token'),
    retry: false,
  });
};

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(authKeys.user, data.user);
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    },
  });
};

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(authKeys.user, data.user);
      toast.success('Registration successful!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => Promise.resolve(authApi.logout()),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.user });
      queryClient.clear();
      toast.success('Logged out successfully!');
    },
  });
};

// Check if user is authenticated
export const useAuth = (): { user: User | null; isAuthenticated: boolean; isLoading: boolean } => {
  const { data: user, isLoading } = useUser();
  
  return {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
  };
};
