import axios from 'axios';
import { authClient } from './auth-client';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Local dev backend
  // baseURL: 'https://byte-kart-be.vercel.app', // Production backend
});

api.interceptors.request.use(
  async (config) => {
    const { data } = await authClient.getSession();
    const token = data?.session?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
