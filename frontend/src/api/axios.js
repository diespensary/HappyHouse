
import axios from 'axios';
import store from '../store/store';

// const instance = axios.create({
//   baseURL: 'http://localhost:8080',
//   withCredentials: false,
// });
const instance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8080',
  withCredentials: false,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, newToken = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(newToken);
  });
  failedQueue = [];
};

// Перехватчик запросов: не добавляем токен для /auth/refresh
instance.interceptors.request.use(config => {
  if (
    config.url?.endsWith('/auth/refresh') || 
    config.url?.includes('/auth/refresh')
  ) {
    delete config.headers.Authorization;
    return config;
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Перехватчик ответов
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Пропускаем обработку для /auth/refresh
    if (
      error.config.url?.includes('/auth/refresh') ||
      error.response?.status !== 401
    ) {
      return Promise.reject(error);
    }

    if (!originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // 1. Обновляем токены
        const newAccessToken = await store.getState().refreshTokens();
        
        // 2. Обновляем глобальные настройки
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        // 3. Обновляем оригинальный запрос
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // 4. Повторяем запросы из очереди
        processQueue(null, newAccessToken);
        
        // 5. Возвращаем оригинальный запрос
        return instance(originalRequest);
      } catch (refreshError) {
        // 6. Очищаем данные при ошибке
        processQueue(refreshError, null);
        store.getState().clearUser();
        window.location.href = '/HappyHouse/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;


