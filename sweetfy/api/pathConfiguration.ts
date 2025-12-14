import axios from 'axios';
import { store } from '@/store';
import { setSession, } from '@/store/authSlice';
import { logoutUser } from '@/store/actions';
import { getStorageItem, setStorageItem } from '@/utils';

export const API_URL = 'https://localhost:7286';
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
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        if (newAccessToken) {
          await setStorageItem('token', newAccessToken);
          
          if (newRefreshToken) {
            await setStorageItem('refreshToken', newRefreshToken);
          }
          
          store.dispatch(setSession(newAccessToken)); 

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }else {
            throw new Error("Token não veio na resposta");
        }
      } catch (refreshError) {
        console.error("Falha ao renovar token. Sessão expirada.", refreshError);
        store.dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;