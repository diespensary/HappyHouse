import React, { useEffect, useState } from "react";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Main from "./pages/main/Main";
import Registration from "./pages/Registration/Registration";


import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router';
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import useStore from "./store/store";
import Product_pg from "./pages/Product_pg/Product_pg";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";
import NotFound from "./pages/NotFound/NotFound";

// // Компонент для защиты маршрутов
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('accessToken');
//   return token ? children : <Navigate to="/HappyHouse/login" replace />;
// };

// // Компонент для редиректа авторизованных пользователей
// const AuthRedirect = ({ children }) => {
//   const token = localStorage.getItem('accessToken');
//   return token ? <Navigate to="/HappyHouse/main" replace /> : children;
// };

const MainLayout = () => (
  <>
    <Header />
    <Outlet /> {/* место, для дочерних маршрутов */}
    <Footer />
  </>
);

function App() {
  // const { setItems, setCurrentItems } = useStore();
  // // const { setItems, setCurrentItems } = useState();
  // const token = localStorage.getItem('accessToken');

  // // Функция загрузки товаров
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const response = await fetch("https://furniture-api.fly.dev/v1/products?limit=100&sort=name_asc");
  //       const response = await fetch("http://localhost:8080/happyhouse/products",{
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  //       if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
  //       const data = await response.json();
  //       // setItems(data.data);
  //       // setCurrentItems(data.data);
        
  //       setItems(data);
  //       setCurrentItems(data);
  //     } catch (error) {
  //       console.error("Ошибка загрузки данных:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, [setItems, setCurrentItems]);

  return (         
    <Router>
      <div className="App">                     
      <Routes>
        <Route path="/HappyHouse" element={<Navigate to="/HappyHouse/login" replace />} />


        <Route path="/HappyHouse/login" element={<Login />} />
        <Route path="/HappyHouse/register" element={<Registration />} />
        

        <Route path="/HappyHouse" element={<MainLayout />}>
          <Route path="main" element={<Main />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<Product_pg />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />          
        </Route>
        

        {/* <Routes>
        <Route path="/HappyHouse" element={<Navigate to="/HappyHouse/login" replace />} />

        {/* Публичные маршруты *
        <Route path="/HappyHouse/login" element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        } />
        <Route path="/HappyHouse/register" element={
          <AuthRedirect>
            <Registration />
          </AuthRedirect>
        } />

        {/* Защищенные маршруты *
        <Route path="/HappyHouse" element={<MainLayout />}>
          <Route path="main" element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          } />
          <Route path="cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="product/:id" element={
            <ProtectedRoute>
              <Product_pg />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />          
        </Route>

        <Route path="*" element={<NotFound/>} />
      </Routes> */}

        {/* Обработка несуществующих маршрутов */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      </div>
    </Router>
  );
}

export default App;
