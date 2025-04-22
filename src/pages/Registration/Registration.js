// import React from 'react'

// import './Registration.css'

// import { useNavigate } from 'react-router'

// function Registration() {
// 	const navigate=useNavigate();
	
// 	return ( 
// 		<div className='register_page'>
// 			{/* <h1 className='logo'>Happy House</h1> */}
// 			<div className='registr'>
// 				<h2>Добро пожаловать</h2>
// 			<form action="" method="get">
				
// 					{/* <label for="name">Введите имя:</label> */}
// 					<div className='col'>
// 						<input type="text" placeholder="name" id="name" required/>
// 					</div>
				
// 				<div className='col'>
// 					{/* <label for="email">Введите email:</label> */}
// 					<input type="email" placeholder="email" id="email" required/>
// 				</div>
// 				<button className="reg_btn" 
// 					type="submit"
// 					onClick={() => navigate("/HappyHouse/main")}
// 				>Регистрация</button>
// 				<div className='go_to_register'
// 					onClick={() => navigate("/HappyHouse/login")}
// 				>на страницу входа</div>
// 			</form>
// 			</div>
			
// 		</div>
// 	)
// }

// export default Registration


import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8080/happyhouse/auth/register',
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          address: formData.address
        }
      );

      // После успешной регистрации перенаправляем на вход
      navigate('/HappyHouse/login');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
      console.error('Registration error:', err.response?.data || err.message);
    }
  };

  return (
    <div className='register_page'>
      <div className='registr'>
        <h2>Регистрация</h2>
        <form onSubmit={handleRegistration}>
          <div className='col'>
            <input
              type="text"
              placeholder="Имя"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='col'>
            <input
              type="text"
              placeholder="Фамилия"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='col'>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='col'>
            <input
              type="password"
              placeholder="Пароль"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='col'>
            <input
              type="text"
              placeholder="Номер телефона"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className='col'>
            <input
              type="text"
              placeholder="Адрес"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button className="reg_btn" type="submit">
            Зарегистрироваться
          </button>

          <div
            className='go_to_register'
            onClick={() => navigate("/HappyHouse/login")}
          >
            На страницу входа
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;

// import React, { useState } from 'react';
// import './Registration.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Registration() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     address: ''
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setError('Пароли не совпадают');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Пароль должен быть не менее 6 символов');
//       return false;
//     }
//     return true;
//   };

//   const handleRegistration = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       await axios.post(
//         'http://localhost:8080/happyhouse/auth/register',
//         {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           phoneNumber: formData.phoneNumber,
//           address: formData.address
//         }
//       );
//       navigate('/HappyHouse/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Ошибка регистрации');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className='register_page'>
//       <div className='registr'>
//         <h2>Регистрация</h2>
//         <form onSubmit={handleRegistration}>
//           <div className='col'>
//             <input
//               type="text"
//               placeholder="Имя"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className='col'>
//             <input
//               type="text"
//               placeholder="Фамилия"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className='col'>
//             <input
//               type="email"
//               placeholder="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className='col'>
//             <input
//               type="password"
//               placeholder="Пароль"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//               minLength="6"
//             />
//           </div>

//           <div className='col'>
//             <input
//               type="password"
//               placeholder="Подтвердите пароль"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className='col'>
//             <input
//               type="tel"
//               placeholder="Номер телефона"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className='col'>
//             <input
//               type="text"
//               placeholder="Адрес"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//             />
//           </div>

//           {error && <div className="error-message">{error}</div>}

//           <button 
//             className="reg_btn" 
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
//           </button>

//           <div
//             className='go_to_register'
//             onClick={() => navigate("/HappyHouse/login")}
//           >
//             На страницу входа
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Registration;