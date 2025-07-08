import axios from 'axios';

// Force API base URL to backend for all environments
const API_BASE_URL = 'https://api.gridrr.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get access token from localStorage (persistent storage)
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Refresh logic ---
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request until refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      refreshPromise = api.post('/auth/refresh')
        .then((response) => {
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          processQueue(null, accessToken);
          return accessToken;
        })
        .catch((refreshError) => {
          localStorage.removeItem('accessToken');
          processQueue(refreshError, null);
          // Do not redirect here; let the app handle it
          return Promise.reject(refreshError);
        })
        .finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });

      return refreshPromise.then((token) => {
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
        return Promise.reject(error);
      });
    }

    return Promise.reject(error);
  }
);

// All post-related requests use the forced API_BASE_URL
export const createPost = async (formData: FormData) => {
  if (!formData.get('title') || !formData.getAll('images').length) {
    throw new Error('Title and at least one image are required.');
  }
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Bearer ' + (localStorage.getItem('accessToken') || '')
      // Do NOT set Content-Type!
    }
  });
  const contentType = res.headers.get('content-type');
  let data;
  if (contentType && contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = { error: await res.text() };
  }
  if (!res.ok) throw new Error(data.error || 'Failed to create post.');
  return data;
};

export const getPosts = async () => {
  return api.get('/posts');
};

export const getPostsByUser = async (userId: string) => {
  return api.get(`/posts/user/${userId}`);
};

export const getPost = async (id: string) => {
  return api.get(`/posts/${id}`);
};

export const likePost = async (id: string) => {
  return api.post(`/posts/${id}/like`);
};

export const followUser = async (userId: string) => {
  return api.post(`/users/${userId}/follow`);
};

export const getProfile = async (userId?: string) => {
  const endpoint = userId ? `/profile/${userId}` : '/profile';
  return api.get(endpoint);
};

export const updateProfile = async (profileData: any) => {
  return api.post('/profile', profileData);
};

export const getFollowers = async (userId: string, limit = 10, offset = 0) => {
  return api.get(`/profile/${userId}/followers?limit=${limit}&offset=${offset}`);
};

export const getFollowing = async (userId: string, limit = 10, offset = 0) => {
  return api.get(`/profile/${userId}/following?limit=${limit}&offset=${offset}`);
};

export const followUserProfile = async (userId: string) => {
  return api.post(`/profile/${userId}/follow`);
};

export default api; 