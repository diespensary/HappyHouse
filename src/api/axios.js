import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false // true если использовать httpOnly cookies
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        if (!localStorage.getItem('refreshToken')) {
          throw new Error('No refresh token');
        }

        const response = await instance.post('/happyhouse/auth/refresh', {
          refreshToken: localStorage.getItem('refreshToken')
        });

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        processQueue(null, response.data.accessToken);
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  delete instance.defaults.headers.common['Authorization'];
  window.location.href = '/HappyHouse/login';
};

export default instance;
