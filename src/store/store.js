import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import instance from '../api/axios';
import { getCurrentUser } from '../auth/auth';

const useStore = create(
  persist(
    (set, get) => ({
    items: [],//все товары
    currentItems: [],//товары определенной категории
    orders: [],//товары в корзине --> заказы
    cart:[],//товары в корзине
    loading: false,
    error: null,
    user: {
      id: null,
      firstName: '',
      lastName: '',
      email:'',
    },


    setUser: (userData) => 
      set(state => ({
        user: {
          ...state.user, // Сохраняем существующие данные
          ...userData    // Обновляем только пришедшие поля
        }
      })),
    setItems: (items) => set({ items }), 
    setCurrentItems: (currentItems) => set({ currentItems }),


    // Очистка данных пользователя (для выхода из системы)
    clearUser: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      set({ 
        user: {
          id: null,
          firstName: '',
          lastName: '',
          email: ''
        }, 
        refreshToken: null
    })},    

    addInCart: (item) =>//добавить в корзину
      set((state) => {
        if (!state.cart.some((el) => el.productId === item.productId)) {
          return { cart: [...state.cart, item] };
        }
        return state;
      }),

    deleteFromCart: (productId) =>//удалить из корзины 
      set((state) => ({
        cart: state.cart.filter((el) => el.productId !== productId),
      })), 

    chooseCategory: (category) => //фильтрация товаров 
      set((state) => ({
        currentItems:
          category === 'all'
            ? state.items
            : state.items.filter((el) => el.categoryId === category),
      })),
    // переключить удаление и добавление в корзине
    toggleCart:(item) =>{
      set((state) => {
        const userId = localStorage.getItem('userId');
        const isInCart = state.cart.some((cartItem) => cartItem.productId === item.productId);
        const cartItem = state.cart.find(c => c.productId === item.productId);

        if (isInCart) {
          // Если товар уже в корзине, удаляем его
          get().removeFromCart(cartItem.cartItemId)
          return { cart: state.cart.filter((cartItem) => cartItem.productId !== item.productId) };
        } else {
          // Если товара нет в корзине, добавляем его
          get().addToCart(userId, item.productId, 1)
          return { cart: [...state.cart, item] };
        }
      })
    },


/////Rest запросы/////


    // Метод для входа
    login: async (email, password) => {
      set({ loading: true, error: null });
      try {
        // 1. Выполняем запрос на логин
        // const loginResponse = await fetch('http://localhost:8080/happyhouse/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password })
        // });
        // if (!loginResponse.ok) throw new Error('Ошибка авторизации');

        const { data } = await instance.post('/happyhouse/auth/login', {
          email,
          password
        });        
        
        // const { accessToken, refreshToken } = await loginResponse.json();
        // localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('refreshToken', refreshToken);

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Получаем данные из токена
        const userDatarow = getCurrentUser();
        localStorage.setItem('userId', userDatarow.id);
        // 2. Загружаем данные пользователя
        const userData = await get().fetchUserData(userDatarow.id);
        
        // 3. Загружаем корзину
        const cartData = await get().fetchCart(userData.userId);

        set({
          user: {
            id: userData.userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email:userData.email,
          },
          // cart: cartData,
          loading: false
        });

      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    // метод для работы с токенами
    // refreshTokens: async () => {
    //   try {
    //     const response = await instance.post('/happyhouse/auth/refresh', {
    //       refreshToken: localStorage.getItem('refreshToken')
    //     });
        
    //     localStorage.setItem('accessToken', response.data.accessToken);
    //     localStorage.setItem('refreshToken', response.data.refreshToken);
    //     return response.data.accessToken;
    //   } catch (error) {
    //     get().clearUser();
    //     throw error;
    //   }
    // },
refreshTokens: async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error("No refresh token");

    // Используем instance вместо axios!
    const response = await instance.post('/happyhouse/auth/refresh', { 
      refreshToken // Ключ должен совпадать с ожидаемым на сервере
    });

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    this.clearUser();
    window.location.href = '/login'; // Форсированный редирект
    throw error;
  }
},

    // Метод для загрузки данных пользователя
    fetchUserData: async (userId) => {
      set({ loading: true, error: null });

      try {
        // const response = await fetch(`http://localhost:8080/happyhouse/users/${userId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        //   }
        // });
        // if (!response.ok) throw new Error('Ошибка загрузки данных пользователя');
        // return await response.json();
        const { data } = await instance.get(`/happyhouse/users/${userId}`);
        return data;
      } catch (error) {
        // set({ error: error.message });

        set({ error: error.data?.message || 'Ошибка загрузки данных пользователя' });
        throw error;
      }
    },

    // Метод для загрузки всех товаров 
    fetchAllProducts: async () => {
      set({ loading: true, error: null });

      try {
        const {data} = await instance.get(`/happyhouse/products`);
        set({items: data, currentItems: data })
        return data;
      }
      catch(error){
        set({error: error.data?.message || 'Ошибка загрузки данных пользователя'})
        throw error;
      }
    },

    // Метод для загрузки одного товара 
    fetchProduct: async (prodId) => {
      set({ loading: true, error: null });

      try {
        // const response = await instance.get(`/happyhouse/products/${prodId}`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //   }
        // })
        // return response.data
        const { data } = await instance.get(`/happyhouse/products/${prodId}`);
        set({ loading: false});
        return data;
      } catch (err) {
        // if (err.response?.status === 401) {
        //   localStorage.removeItem('accessToken')
        //   window.location.href = '/login'
        // }
        set({error: err})
        throw new Error(err.response?.data?.message || 'Ошибка загрузки товара')
      }
    },
    
    // Получение корзины с сервера
    fetchCart: async (userId) => {
      set({ loading: true, error: null });
      try {
        // const token = localStorage.getItem('accessToken');
        // const response = await fetch(`http://localhost:8080/happyhouse/cart/${userId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });        
        // if (!response.ok) throw new Error('Ошибка загрузки корзины');
        // const cartData = await response.json();
        // set({ cart: cartData.cartItems }); 

        const { data } = await instance.get(`/happyhouse/cart/${userId}`);
        set({ cart: data.cartItems });
        return data.cartItems;        
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ loading: false });
      }
    },

    // Метод для загрузки заказов
    fetchOrders: async (userId) => {
      set({ loading: true, error: null });
      try {
        const { data } = await instance.get(`/happyhouse/orders/${userId}`);
        set({ orders: data });
        return data;
      } catch (error) {
        set({ errorOrders: error.response?.data?.message || 'Ошибка загрузки заказов' });
        throw error;
      } finally {
        set({ loading: false });
      }
    },

    // Добавление товара в корзину
    addToCart: async (userId, productId, count = 1) => {
      try {
        // const token = localStorage.getItem('accessToken');
        // const response = await fetch(`http://localhost:8080/happyhouse/cart/${userId}?productId=${productId}&count=${count}`, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json'
        //   }
        // });

        // if (!response.ok) throw new Error('Ошибка добавления в корзину');
        
        // const updatedCart = await response.json();
        // set({ cart: updatedCart.cartItems });
        const { data } = await instance.post(`/happyhouse/cart/${userId}`, null, {
          params: { productId, count }
        });
        set({ cart: data.cartItems });
      } catch (error) {
        set({ error: error.message });
      }
    },

    // Удаление товара из корзины
    removeFromCart: async (cartItemId) => {
      try {
        // const token = localStorage.getItem('accessToken');
        // const response = await fetch(`http://localhost:8080/happyhouse/cart/${cartItemId}`, {
        //   method: 'DELETE',
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });

        // if (!response.ok) throw new Error('Ошибка удаления из корзины');
        
        // const updatedCart = await response.json();
        // set({ cart: updatedCart.cartItems });
        const { data } = await instance.delete(`/happyhouse/cart/${cartItemId}`);
        set({ cart: data.cartItems });
      } catch (error) {
        set({ error: error.message });
      }
    },

    // Обновление количества товара
    updateCartItem: async (cartItemId, newCount) => {
      try {
        // const token = localStorage.getItem('accessToken');
        // const response = await fetch(`http://localhost:8080/happyhouse/cart/${cartItemId}?count=${newCount}`, {
        //   method: 'PUT',
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });

        // if (!response.ok) throw new Error('Ошибка обновления количества');
        
        // const updatedCart = await response.json();
        // set({ cart: updatedCart.cartItems });
        const { data } = await instance.put(`/happyhouse/cart/${cartItemId}`, null, {
          params: { count: newCount }
        });
        set({ cart: data.cartItems });
      } catch (error) {
        set({ error: error.message });
      }
    },

    // Добавляем заказ
    addOrder: async (userId) => {
      set({ loading: true, error: null });
      try {
        // const token = localStorage.getItem('accessToken');
        // const response = await fetch(`http://localhost:8080/happyhouse/orders/${userId}`, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        const { data } = await instance.post(`/happyhouse/orders/${userId}`);

        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(errorData.message || 'Ошибка оформления заказа');
        // }

        // const orderData = await response.json();
        
        // Обновляем состояние
        set(state => ({
          cart: [],
          // orders: [...state.orders, orderData],
          orders: [...state.orders, data],
          loading: false
        }));

        return data;
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    }
  }),
  {
    name: 'app-storage', // Уникальное имя для localStorage
    partialize: (state) => ({
      user: state.user,
      cart: state.cart,
      orders: state.orders
    }), // Сохраняем только нужные поля
    getStorage: () => localStorage, // Используем localStorage
  }
));

export default useStore;