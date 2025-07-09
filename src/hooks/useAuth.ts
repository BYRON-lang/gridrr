import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authService, SignupData, LoginData } from '../services/authService';
import { useToast } from '../contexts/ToastContext';
import { useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const sessionExpiredRef = useRef(false);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      // Access token is stored in localStorage by authService
      queryClient.setQueryData(['user'], data.user);
      navigate('/discover');
    },
    onError: (error: any) => {
      // 🦄 Nothing to see here, just unicorns debugging!
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
      // 🦄 Nothing to see here, just unicorns debugging!
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
      // 🦄 Nothing to see here, just unicorns debugging!
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
    // 🦄 Nothing to see here, just unicorns debugging!
  }, [user, userError, isAuthenticated, isLoadingUser]);

  // Log userError for debugging
  useEffect(() => {
    if (userError) {
      // 🦄 Nothing to see here, just unicorns debugging!
    }
  }, [userError]);

  // Handle authentication errors
  useEffect(() => {
    const status = (userError as any)?.response?.status;
    if (userError && (status === 401 || status === 403)) {
      if (!sessionExpiredRef.current) {
        toast.showToast('Session expired. Please log in again.');
        sessionExpiredRef.current = true;
      }
      localStorage.removeItem('accessToken');
      queryClient.clear();
      navigate('/login');
    } else {
      sessionExpiredRef.current = false;
    }
  }, [userError, navigate, queryClient, toast]);

  // Proactive token refresh logic
  useEffect(() => {
    function scheduleRefresh() {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      let decoded: any;
      try {
        decoded = jwtDecode(token);
      } catch {
        return;
      }
      if (!decoded.exp) return;
      const exp = decoded.exp * 1000; // ms
      const now = Date.now();
      const refreshTime = exp - now - 2 * 60 * 1000; // 2 minutes before expiry
      if (refreshTime <= 0) return;
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = setTimeout(async () => {
        try {
          await authService.refreshToken();
          scheduleRefresh(); // reschedule for new token
        } catch (err) {
          // If refresh fails, let the normal error handling/log out flow run
        }
      }, refreshTime);
    }
    if (isAuthenticated) {
      scheduleRefresh();
    } else if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    return () => {
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
  }, [isAuthenticated, localStorage.getItem('accessToken')]);

  const signup = (data: SignupData) => {
    return signupMutation.mutate(data);
  };

  const login = (data: LoginData) => {
    return loginMutation.mutate(data);
  };

  const loginAsync = (data: LoginData) => {
    return loginMutation.mutateAsync(data);
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
    loginAsync,
    logout,
    isSigningUp: signupMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    signupError: signupMutation.error,
    loginError: loginMutation.error,
    userError,
  };
};