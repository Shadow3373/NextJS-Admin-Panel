import { getTokenClient } from './auth';

const API_BASE_URL = 'http://192.168.1.100:7000/user';

type ApiOptions = {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
};

const apiFetch = async (endpoint: string, options: ApiOptions = {}) => {
  const token = getTokenClient();
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  return await response.json();
};

export const authApi = {
  login: async (email: string, password: string) => {
    return apiFetch('/login', {
      method: 'POST',
      body: { email, password },
    });
  },
  register: async (name: string, email: string, password: string) => {
    return apiFetch('/register', {
      method: 'POST',
      body: { name, email, password },
    });
  },
};

export const userApi = {
  getAll: async () => {
    return apiFetch('/all');
  },
  getProfile: async () => {
    return apiFetch('/profile');
  },
};

export const dashboardApi = {
  getStats: async () => {
    return apiFetch('/dashboard');
  },
};