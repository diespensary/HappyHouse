import React, { useEffect, useState } from 'react'
import './profile.css'
import { FaEdit } from "react-icons/fa";
import Bg_block from '../../Components/Bg_block/Bg_block';
import useStore from '../../store/store';
import ChangePasswordForm from '../../Components/ChangePasswordForm/ChangePasswordForm';


const fetchUserData = async (userId) => {

	try {
		const token = localStorage.getItem('accessToken');
		
		if (!token) {
			throw new Error('Требуется авторизация');
		}
	
		const response = await fetch(`http://localhost:8080/happyhouse/users/${userId}`, {
			method: 'GET',
			headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
			}
		});
	
		// Обработка HTTP-статусов
		if (response.status === 401) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('userId');
			throw new Error('Сессия истекла. Требуется повторный вход');
		}
	
		if (response.status === 403) {
			throw new Error('Доступ запрещен');
		}
	
		if (response.status === 404) {
			throw new Error('Пользователь не найден');
		}
	
		if (!response.ok) {
			throw new Error(`Ошибка сервера: ${response.status}`);
		}
	
		const userData = await response.json();
		return userData;
	
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error);
			throw error; // Прокидываем ошибку для обработки в компоненте
		}
	};

// function Profile() {
// 	const [user, setUser] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState('');
// 	const userId = localStorage.getItem('userId');

// 	useEffect(() => {
// 		const loadData = async () => {
// 		try {
// 			const data = await fetchUserData(userId);
// 			setUser(data);
// 		} catch (err) {
// 			setError(err.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 		};

// 		if (userId) {
// 		loadData();
// 		} else {
// 		setError('Пользователь не авторизован');
// 		setLoading(false);
// 		}
// 	}, [userId]);

// 	if (loading) return <div>Загрузка...</div>;
// 	return (
		
// 		<Bg_block header={"Профиль"}>					
// 			<h1 className='name'>
// 				<span>{user.firstName} {user.lastName}</span>
// 				<FaEdit className='edit-icon' />
// 			</h1>
// 			<div className='user-email'>{user.email}</div>
// 			<div className='user-address'>{user.address}</div>

// 			</Bg_block>
// 	)
// }

// export default Profile


function Profile() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [isChanging, setIsChanging] = useState(false);
	const [formData, setFormData] = useState({
	  firstName: '',
	  lastName: '',
	  phoneNumber: '',
	  address: ''
	});
	const userId = localStorage.getItem('userId');
	// const userId = useStore(state => state.user.id);
	
	const toggleChangePassword = () => {
		setIsChanging(prev => !prev);
	  };
  
	// Загрузка данных пользователя
	useEffect(() => {
	  const loadData = async () => {
		try {
		  const data = await fetchUserData(userId);
		  setUser(data);
		  setFormData({
			firstName: data.firstName || '',
			lastName: data.lastName || '',
			phoneNumber: data.phoneNumber || '',
			address: data.address || ''
		  });
		} catch (err) {
		  setError(err.message);
		} finally {
		  setLoading(false);
		}
	  };
  
	  if (userId) loadData();
	  else {
		setError('Пользователь не авторизован');
		setLoading(false);
	  }
	}, [userId]);
  
	// Обработчик изменения полей формы
	const handleInputChange = (e) => {
	  const { name, value } = e.target;
	  setFormData(prev => ({
		...prev,
		[name]: value
	  }));
	};
  
	// Отправка обновленных данных
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  try {
		const token = localStorage.getItem('accessToken');
		const response = await fetch(`http://localhost:8080/happyhouse/users/${userId}`, {
		  method: 'PUT',
		  headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(formData)
		});
  
		if (!response.ok) {
		  throw new Error('Ошибка обновления данных');
		}
  
		const updatedUser = await response.json();
		setUser(updatedUser);
		setIsEditing(false);
		alert('Данные успешно обновлены!');
  
	  } catch (err) {
		console.error('Update error:', err);
		setError(err.message);
	  }
	};
  
	if (loading) return <div>Загрузка...</div>;
	if (error) return <div className="error">{error}</div>;
  
	return (
		<Bg_block header={"Профиль"}>
			{isEditing ? (
			<form className="profile-form" onSubmit={handleSubmit}>
				<div className="form-group">
				<label>Имя:</label>
				<input
					type="text"
					name="firstName"
					value={formData.firstName}
					onChange={handleInputChange}
					required
				/>
				</div>
	
				<div className="form-group">
				<label>Фамилия:</label>
				<input
					type="text"
					name="lastName"
					value={formData.lastName}
					onChange={handleInputChange}
					required
				/>
				</div>
	
				<div className="form-group">
				<label>Телефон:</label>
				<input
					type="tel"
					name="phoneNumber"
					value={formData.phoneNumber}
					onChange={handleInputChange}
					pattern="\+?[0-9\s\-\(\)]+"
				/>
				</div>
	
				<div className="form-group">
				<label>Адрес:</label>
				<textarea
					name="address"
					value={formData.address}
					onChange={handleInputChange}
					rows="3"
				/>
				</div>
	
				<div className="form-actions">
				<button type="submit" className="btn-save profile-btns">Сохранить</button>
				<button 
					type="button" 
					className="btn-cancel profile-btns"
					onClick={() => setIsEditing(false)}
				>
					Отмена
				</button>
				</div>
			</form>
			) : (
			<>
				<h1 className='name'>
				<span>{user.firstName} {user.lastName}</span>
				<FaEdit 
					className='edit-icon' 
					onClick={() => setIsEditing(true)} 
				/>
				</h1>
				<h4 className='user-email'>Почта: {user.email}</h4>
				{user.phoneNumber && (
				<h4 className='user-phone'>Телефон: {user.phoneNumber}</h4>
				)}
				{user.address && (
				<h4 className='user-address'>Адрес: {user.address}</h4>
				)}
			</>
			)}
			{/* <button className='changePass-btn profile-btns' onClick={toggleChangePassword}>{!isChanging ? 'Изменить пароль' : "Закрыть окно"}</button> */}
			
			{!isChanging && (
				<button 
				className='changePass-btn profile-btns' 
				onClick={() => setIsChanging(true)}
				>
				Изменить пароль
				</button>
			)}

			{isChanging && (
				<ChangePasswordForm 
				setIsChanging={setIsChanging}
				onSuccess={() => setIsChanging(false)}
				/>
			)}
		</Bg_block>
	);
  }

export default Profile;