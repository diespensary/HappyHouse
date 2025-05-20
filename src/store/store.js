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

        const { data } = await instance.post('/happyhouse/auth/login', {
          email,
          password
        });        
        
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
    refreshTokens: async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error("No refresh token");

        const response = await instance.post('/happyhouse/auth/refresh', { 
          refreshToken // Ключ должен совпадать с ожидаемым на сервере
        });

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data.accessToken;
      } catch (error) {
        this.clearUser();
        window.location.href = '/HappyHouse/login'; // Форсированный редирект
        throw error;
      }
    },

    // Метод для загрузки данных пользователя
    fetchUserData: async (userId) => {
      set({ loading: true, error: null });

      try {
        const { data } = await instance.get(`/happyhouse/users/${userId}`);
        return data;
      } catch (error) {
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
        const { data } = await instance.get(`/happyhouse/products/${prodId}`);
        set({ loading: false});
        return data;
      } catch (err) {

        set({error: err})
        throw new Error(err.response?.data?.message || 'Ошибка загрузки товара')
      }
    },
    
    // Получение корзины с сервера
    fetchCart: async (userId) => {
      set({ loading: true, error: null });
      try {
        const { data } = await instance.get(`/happyhouse/cart/${userId}`);
        set({ cart: data.cartItems });
        return data.cartItems;        
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ loading: false });
      }
    },

    fetchOrders: async (userId) => {
      set({ loading: true, error: null });
      try {
        const { data } = await instance.get(`/happyhouse/orders/${userId}`);
        set({ 
          orders: Array.isArray(data) ? data : [] // Гарантируем массив
        });
        return data;
      } catch (error) {
        set({ 
          orders: [], // Сбрасываем до пустого массива
          errorOrders: error.response?.data?.message || 'Ошибка загрузки заказов'
        });
        throw error;
      }
    },
    // Метод для обновления пароля пользователя
    updateUserPassword: async (userId, oldPassword, newPassword) => {
      set({ loading: true, error: null });
      try {
        const { data } = await instance.put(`/happyhouse/users/${userId}/change-password`, {
          oldPassword,
          newPassword
        });
    
        set({ loading: false, error: null });
        return data;
      } catch (error) {
        set({
          error: error.response?.data?.message || 'Ошибка смены пароля',
          loading: false
        });
        throw error;
      }
    },
    // Метод для обновления данных пользователя
    updateUserProfile: async (userId, formData) => {
      set({ loading: true, error: null });
      try {
        const { data } = await instance.put(`/happyhouse/users/${userId}`, formData);
        
        // Синхронизируем обновленные данные с состоянием
        set(state => ({
          user: {
            ...state.user,
            ...data
          },
          loading: false
        }));
        
        return data;
      } catch (error) {
        set({
          error: error.response?.data?.message || 'Ошибка обновления профиля',
          loading: false
        });
        throw error;
      }
    },

    // Добавление товара в корзину
    addToCart: async (userId, productId, count = 1) => {
      try {
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
        const { data } = await instance.delete(`/happyhouse/cart/${cartItemId}`);
        set({ cart: data.cartItems });
      } catch (error) {
        set({ error: error.message });
      }
    },

    // Обновление количества товара
    updateCartItem: async (cartItemId, newCount) => {
      try {
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
        const { data } = await instance.post(`/happyhouse/orders/${userId}`);
        // Перезапрашиваем актуальные данные с сервера
        const updatedOrders = await get().fetchOrders(userId); 
        set({ 
          cart: [],
          orders: updatedOrders, // Используем данные с сервера
          loading: false 
        });
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