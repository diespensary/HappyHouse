import { useState } from 'react';
import styles from './Registration.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from 'react-phone-number-input/input'

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
  const handlePhoneChange = (phoneNumber) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: phoneNumber || ''
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
      navigate('/HappyHouse/login');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
      console.error('Registration error:', err.response?.data || err.message);
    }
  };

  return (
    <div className={`${styles.register_page}`}>
      <div className={`${styles.registr}`}>
        <h2>Регистрация</h2>
        <form className={`${styles.form}`} onSubmit={handleRegistration} autoComplete="off">
          <div className='col'>
            <input
              className={`${styles.input}`}
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
              className={`${styles.input}`}
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
              className={`${styles.input}`}
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
              className={`${styles.input}`}
              type="password"
              placeholder="Пароль"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col'>
            <Input
              className={`${styles.input}`}
              placeholder="Введите номер телефона"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
            />

          </div>

          <div className='col'>
            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Адрес"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          {error && <div>{error}</div>}

          <button className={`${styles.reg_btn}`} type="submit">
            Зарегистрироваться
          </button>

          <div
            className={`${styles.go_to_login}`}
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