import { create } from 'zustand';

const useStore = create((set) => ({
  // items: [],//все товары
  currentItems: [],//товары определенной категории
  orders: [],//товары в корзине
  user: {
    id: null,
    firstName: '',
    lastName: '',
  },

  // Обновление данных пользователя
  setUser: (userData) => set({ user: {...userData} }),

  // Очистка данных пользователя (для выхода из системы)
  clearUser: () => set({ 
    user: {
      id: null,
      firstName: '',
      lastName: '',
      email: ''
    }
  }),

  
  setItems: (items) => set({ items }), 

  setCurrentItems: (currentItems) => set({ currentItems }),

  addOrder: (item) =>//добавить в корзину
    set((state) => {
      if (!state.orders.some((el) => el.id === item.id)) {
        return { orders: [...state.orders, item] };
      }
      return state;
    }),

  deleteOrder: (id) =>//удалить из корзины 
    set((state) => ({
      orders: state.orders.filter((el) => el.id !== id),
    })), 
  
  chooseCategory: (category) => //фильтрация товаров 
    set((state) => ({
      currentItems:
        category === 'all'
          ? state.items
          : state.items.filter((el) => el.category === category),
    })),

  toggleFavorite: (item) =>
    set((state) => {
      const isInOrders = state.orders.some((order) => order.id === item.id);
      if (isInOrders) {
        // Если товар уже в корзине, удаляем его
        return { orders: state.orders.filter((order) => order.id !== item.id) };
      } else {
        // Если товара нет в корзине, добавляем его
        return { orders: [...state.orders, item] };
      }
    }),

}));

export default useStore;