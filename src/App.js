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

// Компонент для защиты маршрутов
const ProtectedRoute = ({ children }) => {
  const { user } = useStore();
  const token = localStorage.getItem('accessToken');
  
  return user.id && token ? children : <Navigate to="/HappyHouse/login" replace />;
  // return token ? children : children;

};

// Компонент для редиректа авторизованных пользователей
const AuthRedirect = ({ children }) => {
  const { user } = useStore();
  const token = localStorage.getItem('accessToken');
  
  return user.id && token ? <Navigate to="/HappyHouse/main" replace /> : children;
};


const MainLayout = () => (
  <>
    <Header />
    <Outlet /> {/* место, для дочерних маршрутов */}
    <Footer />
  </>
);

function App() {

  return (
    <Router >
      <div className="App">
        <Routes>
          <Route path="/HappyHouse" element={<Navigate to="/HappyHouse/login" replace />} />

          {/* Публичные маршруты */}
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

          {/* Защищенные маршруты */}
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

          {/* Обработка несуществующих маршрутов */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
