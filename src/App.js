import React, { useState, useEffect } from "react";
// import Categories from './Components/Categories/Categories';
import Header from './Components/Header/Header';
// import Presentation from './Components/Presentation/Presentation';
// import itemsData from './data/products'
// import Items from './Components/Items/Items';
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
          <Route path="/HappyHouse"
            element={<Navigate to="/HappyHouse/login"/>}
          />
          {/* Страница входа */}
          <Route path="/HappyHouse/login"
            element={ <Login/>}
          />
          {/* Страница регистрация */}
          <Route path="/HappyHouse/register"
            element={ <Registration/>}
          />
          {/* Главная страница с товарами */}
          <Route 
            path="/HappyHouse/main" 
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
            path="/HappyHouse/cart" 
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
            path="/HappyHouse/product/:id" 
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
            path="/HappyHouse/profile" 
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
            path="/HappyHouse/orders" 
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
