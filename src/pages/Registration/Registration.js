import { useState } from 'react';
import './Registration.css';
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
    <div className='register_page'>
      <div className='registr'>
        <h2>Регистрация</h2>
        <form onSubmit={handleRegistration} autoComplete="off">
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

          {/* <div className='col'>
            <input
              type="tel"
              placeholder="8-999-999-9999"
              name="phoneNumber"
              pattern="[0-9]-[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div> */}
          <div className='col'>
            <Input
              placeholder="Enter phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
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