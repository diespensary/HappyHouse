// import React from 'react'
// import './login.css'
// import { useNavigate } from 'react-router'

// function Login() {
// 	const navigate=useNavigate();

// 	return (
// 		<div className='register_page'>
// 			{/* <h1 className='logo'>Happy House</h1> */}
// 			<div className='registr'>
// 				<h2>Добро пожаловать</h2>
// 			<form action="" method="get">				
// 				{/* <label for="name">Введите имя:</label> */}
// 				<div className='col'>
// 					<input type="text" placeholder="name" id="name" required/>
// 				</div>

// 				<div className='col'>
// 					{/* <label for="email">Введите email:</label> */}
// 					<input type="email" placeholder="email" id="email" required/>
// 				</div>
// 				<button className="reg_btn" 
// 					type="submit"
// 					onClick={() => navigate("/HappyHouse/main")}
// 				>Вход</button>
// 					<div className='go_to_register'
// 						onClick={() => navigate("/HappyHouse/register")}
// 					>зарегистрироваться</div>
// 			</form>
// 			</div>
			
// 		</div>
// 	)
// }

// export default Login



import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import useStore from '../../store/store';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useStore();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     // Отправляем запрос к вашему API
  //     const response = await axios.post(
  //       'http://localhost:8080/happyhouse/auth/login',
  //       {
  //         email: email,
  //         password: password
  //       }
  //     );

  //     // Сохраняем токен 
  //     localStorage.setItem('accessToken', response.data);
      
  //     // Перенаправляем на защищенную страницу
  //     navigate('/HappyHouse/main');
      
  //   } catch (err) {
  //     setError('Неверный email или пароль');
  //     console.error('Login error:', err.response?.data || err.message);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://localhost:8080/happyhouse/auth/login',
        {
          email: email,
          password: password
        }
      );

      // Проверяем и сохраняем данные ответа
      if (response.data && response.data.accessToken && response.data.userId) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userId', response.data.userId);
        setUser({
          id: response.data.userId,
          firstName: response.data.firstName,
          // lastName: response.data.lastName,
        })
        
        navigate('/HappyHouse/main');
      } else {
        throw new Error('Неверный формат ответа сервера');
      }
      
    } catch (err) {
      const serverError = err.response?.data?.error;
      setError(serverError || 'Ошибка соединения с сервером');
      console.error('Login error:', err.response?.data || err.message);
    }
  };
  return (
    <div className='register_page'>
      <div className='registr'>
        <h2>Добро пожаловать</h2>
        <form onSubmit={handleLogin}>
          <div className='col'>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='col'>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button className="reg_btn" type="submit">
            Вход
          </button>

          <div
            className='go_to_register'
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

// import React, { useState } from 'react';
// import './login.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await axios.post(
//         'http://localhost:8080/happyhouse/auth/login',
//         { email, password },
//         { withCredentials: true }
//       );

//       localStorage.setItem('accessToken', response.data.accessToken);
//       localStorage.setItem('userId', response.data.userId);
//       localStorage.setItem('tokenExpiration', response.data.accessTokenExpiration);
      
//       navigate('/HappyHouse/main');
      
//     } catch (err) {
//       setError(err.response?.data?.error || 'Неверный email или пароль');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className='register_page'>
//       <div className='registr'>
//         <h2>Добро пожаловать</h2>
//         <form onSubmit={handleLogin}>
//           <div className='col'>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               autoComplete="email"
//             />
//           </div>

//           <div className='col'>
//             <input
//               type="password"
//               placeholder="Пароль"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               autoComplete="current-password"
//             />
//           </div>

//           {error && <div className="error-message">{error}</div>}

//           <button 
//             className="reg_btn" 
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Загрузка...' : 'Вход'}
//           </button>

//           <div
//             className='go_to_register'
//             onClick={() => navigate("/HappyHouse/register")}
//           >
//             Зарегистрироваться
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;