// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:8080',
//   withCredentials: false // true если использовать httpOnly cookies
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// instance.interceptors.request.use(config => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return instance(originalRequest);
//         }).catch(err => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         if (!localStorage.getItem('refreshToken')) {
//           throw new Error('No refresh token');
//         }

//         const response = await instance.post('/happyhouse/auth/refresh', {
//           refreshToken: localStorage.getItem('refreshToken')
//         });

//         localStorage.setItem('accessToken', response.data.accessToken);
//         localStorage.setItem('refreshToken', response.data.refreshToken);

//         instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
//         originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

//         processQueue(null, response.data.accessToken);
//         return instance(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         logout();
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export const logout = () => {
//   localStorage.removeItem('accessToken');
//   localStorage.removeItem('refreshToken');
//   delete instance.defaults.headers.common['Authorization'];
//   window.location.href = '/HappyHouse/login';
// };

// export default instance;

import axios from 'axios';
import store from '../store/store';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
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
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;


// export default instance;

// import axios from 'axios';
// import store from '../store/store'; // Импортируем хранилище напрямую

// const instance = axios.create({
//   baseURL: 'http://localhost:8080',
//   withCredentials: false
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, newToken = null) => {
//   failedQueue.forEach(prom => {
//     error ? prom.reject(error) : prom.resolve(newToken);
//   });
//   failedQueue = [];
// };

// // Перехватчик для добавления токена в заголовки
// // instance.interceptors.request.use(config => {
// //   const token = localStorage.getItem('accessToken');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });
// instance.interceptors.request.use(config => {
//   const token = localStorage.getItem('accessToken');  
//   // Не добавляем Authorization для /auth/refresh
//   console.log('CHECKING', config.url.includes('/auth/refresh'))
//   if (token){
//     if (!config.url.includes('/auth/refresh')) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
  
//   return config;
// });

// // Перехватчик для обработки ошибок
// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     // Если ошибка 401 и это не повторный запрос
//     if (error.response?.status === 401 && !originalRequest._retry) {
      
//       // Если уже обновляем токен, добавляем запрос в очередь
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return instance(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // Вызываем метод refreshTokens из Zustand-хранилища
//         const newAccessToken = await store.getState().refreshTokens();
        
//         // Обновляем заголовок для новых запросов
//         instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
//         // Обновляем оригинальный запрос
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
//         // Пробрасываем новый токен в очередь
//         processQueue(null, newAccessToken);
        
//         // Повторяем оригинальный запрос
//         return instance(originalRequest);
//       } catch (refreshError) {
//         // Если обновление не удалось - разлогиниваем
//         processQueue(refreshError, null);
//         store.getState().clearUser();
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default instance;