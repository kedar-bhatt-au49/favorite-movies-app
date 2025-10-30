import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
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
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors (unauthorized)
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Immediately set the user data in the query cache
      queryClient.setQueryData(authKeys.user, data.user);
      
      // Invalidate and refetch user query to ensure consistency
      queryClient.invalidateQueries({ queryKey: authKeys.user });
      
      toast.success('Login successful!');
      
      // Navigate to home page after successful login
      navigate('/', { replace: true });
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      const message = error.response?.data?.error || error.response?.data?.message || 'Login failed';
      toast.error(message);
    },
  });
};

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Immediately set the user data in the query cache
      queryClient.setQueryData(authKeys.user, data.user);
      
      // Invalidate and refetch user query to ensure consistency
      queryClient.invalidateQueries({ queryKey: authKeys.user });
      
      toast.success('Registration successful!');
      
      // Navigate to home page after successful registration
      navigate('/', { replace: true });
    },
    onError: (error: any) => {
      console.error('Registration error:', error);
      const message = error.response?.data?.error || error.response?.data?.message || 'Registration failed';
      toast.error(message);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => Promise.resolve(authApi.logout()),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.user });
      queryClient.clear();
      toast.success('Logged out successfully!');
      
      // Navigate to login page
      navigate('/login', { replace: true });
    },
  });
};

// Check if user is authenticated
export const useAuth = (): { user: User | null; isAuthenticated: boolean; isLoading: boolean } => {
  const { data: user, isLoading, error } = useUser();
  
  // Check if we have a stored user as fallback
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('auth_token');
  
  // If we have stored data but the query failed, use stored data
  const fallbackUser = storedUser && storedToken ? JSON.parse(storedUser) : null;
  
  return {
    user: user || fallbackUser,
    isAuthenticated: !!(user || fallbackUser),
    isLoading: isLoading && !!storedToken, // Only show loading if we expect to be authenticated
  };
};
