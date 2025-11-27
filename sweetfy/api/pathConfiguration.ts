import axios from 'axios';

export const API_URL = 'https://petrous-lilli-manfully.ngrok-free.dev';

const api = axios.create({
  baseURL: `${API_URL}/api`, 
  headers:{
    "ngrok-skip-browser-warning": 'true',
  }
});

export default api;