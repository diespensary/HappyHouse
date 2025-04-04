import React, { useState, useEffect } from "react";
import Categories from './Components/Categories/Categories';
import Header from './Components/Header/Header';
import Presentation from './Components/Presentation/Presentation';
import itemsData from './data/products'
import Items from './Components/Items/Items';
import Footer from './Components/Footer/Footer';
import Main from "./pages/main/Main";
import Registration from "./pages/Registration/Registration";


import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router';
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import useStore from "./store/store";
import Product_pg from "./pages/Product_pg/Product_pg";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";


function App() {
  const { setItems, setCurrentItems } = useStore();

  // Функция загрузки товаров
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://furniture-api.fly.dev/v1/products?limit=100&sort=name_asc");
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const data = await response.json();
        setItems(data.data);
        setCurrentItems(data.data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
  
    fetchData();
  }, [setItems, setCurrentItems]);

  return (         
    <Router>
      <div className="App">                     
        <Routes>
          {/*Стартовая страница */}
          <Route path="/Shop-react2"
            element={<Navigate to="/Shop-react2/login"/>}
          />
          {/* Страница входа */}
          <Route path="/Shop-react2/login"
            element={ <Login/>}
          />
          {/* Страница регистрация */}
          <Route path="/Shop-react2/register"
            element={ <Registration/>}
          />
          {/* Главная страница с товарами */}
          <Route 
            path="/Shop-react2/main" 
            element={
              <>
                <Header  />
                <Main />
                <Footer />
              </>
            } 
          />
          {/* Страница корзины */}
          <Route 
            path="/Shop-react2/cart" 
            element={
              <>
                <Header  />
                <Cart />
                <Footer />
              </>
            } 
          />
          {/* Страница товара */}
          <Route 
            path="/Shop-react2/product/:id" 
            element={
              <>
                <Header  />
                <Product_pg />
                <Footer />
              </>
            } 
          />
          {/* Страница профиля */}
          <Route 
            path="/Shop-react2/profile" 
            element={
              <>
                <Header  />
                <Profile />
                <Footer />
              </>
            } 
          />
          {/* Страница заказов */}
          <Route 
            path="/Shop-react2/orders" 
            element={
              <>
                <Header  />
                <Orders />
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;










  // const [items, setItems] = useState([]); // Все товары
  // const [currentItems, setCurrentItems] = useState([]); // Текущие товары на экране
  // const [orders, setOrders] = useState([]); // Корзина

  // // Функция загрузки товаров
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://furniture-api.fly.dev/v1/products?limit=100&sort=name_asc");
  //       if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
  //       const data = await response.json();
  //       setItems(data.data); // Сохраняем товары в состояние
  //       setCurrentItems(data.data); // Устанавливаем текущие товары
  //     } catch (error) {
  //       console.error("Ошибка загрузки данных:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // // Фильтрация по категориям
  // const chooseCategory = (category) => {
  //   if (category === 'all') {
  //     setCurrentItems(items);
  //   } else {
  //     setCurrentItems(items.filter(el => el.category === category));
  //   }
  // };
  // // Удаление товара из корзины
  // const deleteOrder = (id) => {
  //   setOrders(orders.filter(el => el.id !== id));
  // };

  // // Добавление товара в корзину
  // const addOrder = (item) => {
  //   if (!orders.some(el => el.id === item.id)) {
  //     setOrders([...orders, item]);
  //   }
  // };

  // return (
  //   <div className="App">
  //     {/* <Registration/>
  //     <Header orders={orders} onDelete={deleteOrder} />
  //     <Main onChoose={chooseCategory} items={currentItems} onAdd={addOrder}/> */}
  //     <Registration/>
  //     <Router>
  //     <div className="App">
  //       <Header orders={orders} onDelete={deleteOrder} />
  //       <Routes>
  //         <Route path="/" element={<Main onChoose={chooseCategory} items={currentItems} onAdd={addOrder} />} />
  //         <Route path="/cart" element={<Cart orders={orders} onDelete={deleteOrder} />} />
  //       </Routes>
  //       <Footer />
  //     </div>
  //   </Router>
  //   </div>
  // );

//   return (         
//     <Router>
//       <div className="App">                     
//         <Routes>
//           {/*Стартовая страница */}
//           <Route path="/"
//             element={<Navigate to="/Shop-react2/login"/>}
//           />

//           {/* Страница входа */}
//           <Route path="/Shop-react2/login"
//             element={ <Login/>}
//           />
//           {/* Страница регистрация */}
//           <Route path="/Shop-react2/register"
//             element={ <Registration/>}
//           />

//           {/* Главная страница с товарами */}
//           <Route 
//             path="/Shop-react2/main" 
//             element={
//               <>
//                 <Header orders={orders} onDelete={deleteOrder} />
//                 <Main onChoose={chooseCategory} items={currentItems} onAdd={addOrder} />
//                 <Footer />
//               </>
//             } 
//           />

//           {/* Страница корзины */}
//            <Route 
//             path="/Shop-react2/cart" 
//             element={
//               <>
//                 <Header orders={orders} onDelete={deleteOrder} />
//                 <Cart orders={orders} onDelete={deleteOrder} />
//                 <Footer />
//               </>
//             } 
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
