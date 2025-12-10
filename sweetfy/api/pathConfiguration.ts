import axios from 'axios';
import { getStorageItem, removeStorageItem, setStorageItem } from '../context/utils';
import { router } from 'expo-router';

export const API_URL = 'https://petrous-lilli-manfully.ngrok-free.dev';
const api = axios.create({
  baseURL: `${API_URL}/api`, 
  headers:{
    "ngrok-skip-browser-warning": 'true',
  }
});


api.interceptors.request.use(async (config) => {
  try {
    const token = await getStorageItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Erro ao recuperar token", error);
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes('/login') || originalRequest.url.includes('/register')) {
       return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
       const currentAccessToken = await getStorageItem('token');
        const currentRefreshToken = await getStorageItem('refreshToken');

        if (!currentAccessToken || !currentRefreshToken) {
            throw new Error("Tokens não encontrados no storage");
        }
        const response = await axios.post(`${API_URL}/api/Auth/refresh-token`, { 
            accessToken: currentAccessToken,
            refreshToken: currentRefreshToken
        });

        const { credentials: newToken } = response.data;

        if (newToken) {
          setStorageItem('token', newToken)
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        }

      } catch (refreshError) {
        console.error("Falha ao renovar token. Sessão expirada.");
        removeStorageItem('token');
        router.push('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;