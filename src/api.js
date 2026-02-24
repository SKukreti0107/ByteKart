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

api.getWithCache = async (url, config = {}, ttl = 300000) => {
  const cacheKey = `cache_${url}`;
  try {
    const cachedItem = sessionStorage.getItem(cacheKey);
    if (cachedItem) {
      const { data, timestamp } = JSON.parse(cachedItem);
      if (Date.now() - timestamp < ttl) {
        // Enforce a deliberate 300ms delay to allow Skeleton UI to smoothly transition instead of flashing instantly
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data, fromCache: true };
      }
    }
  } catch (error) {
    console.warn("Failed to read from cache:", error);
  }

  const response = await api.get(url, config);

  try {
    const cacheData = {
      data: response.data,
      timestamp: Date.now()
    };
    sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.warn("Failed to write to cache:", error);
  }

  return response;
};

api.clearCache = (urlPattern) => {
  try {
    const keys = Object.keys(sessionStorage);
    for (const key of keys) {
      if (key.startsWith('cache_')) {
        if (!urlPattern || key.includes(urlPattern)) {
          sessionStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    console.warn("Failed to clear cache:", error);
  }
};

export default api;
