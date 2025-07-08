import api from './api';

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  accessToken: string;
}

export const authService = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', data);
    // Store access token temporarily
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    // Store access token temporarily
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    // Clear temporary access token
    localStorage.removeItem('accessToken');
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await api.post('/auth/refresh');
    // Store new access token temporarily
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  getCurrentUser: async (): Promise<any> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateCurrentUser: async (data: { firstName: string; lastName: string; email: string }): Promise<any> => {
    const response = await api.put('/auth/me', data);
    return response.data;
  },

  // Helper to check if user is authenticated
  isAuthenticated: (): boolean => {
    // Check if we have a valid token by making a request
    // This will be determined by API calls
    return !!localStorage.getItem('accessToken');
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<any> => {
    return api.post('/auth/change-password', { currentPassword, newPassword });
  },

  getProfile: async (): Promise<any> => {
    return api.get('/profile');
  },

  saveProfile: async (profile: any): Promise<any> => {
    return api.post('/profile', profile);
  },
}; 