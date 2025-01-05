import axios from 'axios';
import { environment } from '@/environment/environment.dev';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

export const createApiClient = (baseURL = environment.apiUrl) => {
  const apiClient = axios.create({ baseURL });

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            refreshSubscribers.push((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem('refresh_token');
          const response = await apiClient.post('/token/refresh', {
            refresh_token: refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem('access_token', accessToken);

          refreshSubscribers.forEach((callback) => callback(accessToken));
          refreshSubscribers = [];
          
          return apiClient(originalRequest);
        } catch (error) {
          window.location.href = '/login';
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

export const apiClient = createApiClient();