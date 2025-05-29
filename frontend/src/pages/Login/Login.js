import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/store';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      
      // Перенаправляем на защищенную страницу
      navigate('/HappyHouse/main');
      
    } catch (err) {
      setError('Неверный email или пароль');
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return (
    <div className={`${styles.login_page}`}>
      <div className={`${styles.login}`}>
        <h2>Добро пожаловать</h2>
        {/* <form onSubmit={handleLogin}> */}
        <form className={`${styles.form}`} onSubmit={handleLogin}>
          <div className='col'>
            <input
              className={`${styles.input}`}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='col'>
            <input
              className={`${styles.input}`}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button className={`${styles.enter_btn}`} type="submit">
            Вход
          </button>

          <div
            className={`${styles.go_to_register}`}
            onClick={() => navigate("/HappyHouse/register")}
          >
            Зарегистрироваться
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;