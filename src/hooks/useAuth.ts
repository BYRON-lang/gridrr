import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authService, SignupData, LoginData } from '../services/authService';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      // Access token is stored in localStorage by authService
      queryClient.setQueryData(['user'], data.user);
      navigate('/discover');
    },
    onError: (error: any) => {
      console.error('Signup error:', error);
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Access token is stored in localStorage by authService
      queryClient.setQueryData(['user'], data.user);
      navigate('/discover');
    },
    onError: (error: any) => {
      console.error('Login error:', error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Access token is cleared by authService
      queryClient.clear();
      navigate('/');
    },
    onError: () => {
      // Even if logout API fails, clear local cache
      localStorage.removeItem('accessToken');
      queryClient.clear();
      navigate('/');
    },
  });

  const hasToken = !!localStorage.getItem('accessToken');

  const { data: user, isLoading: isLoadingUser, error: userError } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    enabled: hasToken,
    retry: (failureCount, error: any) => {
      console.log('React Query retry error:', error);
      if ((error as any)?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const isAuthenticated = !!localStorage.getItem('accessToken') && !!user;

  // Debug log for auth state
  useEffect(() => {
    console.log('Auth debug:', {
      accessToken: localStorage.getItem('accessToken'),
      user,
      userError,
      isAuthenticated,
      isLoadingUser,
    });
  }, [user, userError, isAuthenticated, isLoadingUser]);

  // Log userError for debugging
  useEffect(() => {
    if (userError) {
      console.error('User fetch error:', userError);
    }
  }, [userError]);

  // Handle authentication errors
  useEffect(() => {
    const status = (userError as any)?.response?.status;
    if (userError && (status === 401 || status === 403)) {
      localStorage.removeItem('accessToken');
      queryClient.clear();
      navigate('/');
      // Optionally, show a toast here if you want
    }
  }, [userError, navigate, queryClient]);

  const signup = (data: SignupData) => {
    return signupMutation.mutate(data);
  };

  const login = (data: LoginData) => {
    return loginMutation.mutate(data);
  };

  const logout = () => {
    return logoutMutation.mutate();
  };

  return {
    user,
    isLoadingUser,
    isAuthenticated,
    signup,
    login,
    logout,
    isSigningUp: signupMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    signupError: signupMutation.error,
    loginError: loginMutation.error,
    userError,
  };
};