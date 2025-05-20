import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import styles from './profile.module.css';
import Bg_block from '../../Components/Bg_block/Bg_block';
import useStore from '../../store/store';
import ChangePasswordForm from '../../Components/ChangePasswordForm/ChangePasswordForm';

const Profile = () => {
  const { 
    user, 
    loading, 
    error, 
    fetchUserData, 
    updateUserProfile 
  } = useStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  });

  const userId = localStorage.getItem('userId');

  // Загрузка данных при монтировании
  useEffect(() => {
    const loadUserData = async () => {
      if (userId) {
        try {
          const data = await fetchUserData(userId);
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phoneNumber: data.phoneNumber || '',
            address: data.address || ''
          });
        } catch (error) {
          console.error('Ошибка загрузки:', error);
        }
      }
    };

    loadUserData();
  }, [userId, fetchUserData]);

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
      await updateUserProfile(userId, formData);
      setIsEditing(false);
      alert('Профиль успешно обновлен!');
    } catch (error) {
      console.error('Ошибка обновления:', error);
    }
  };

  // if (loading) return <Bg_block header="Профиль"><div>Загрузка...</div></Bg_block>;
  if (error) return <Bg_block header="Профиль"><div className="error">{error}</div></Bg_block>;

  return (
    <Bg_block header="Профиль">
      {isEditing ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label className={styles.form_group_label}>Имя:</label>
            <input
              className={styles.form_group_input}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_group_label}>Фамилия:</label>
            <input
              className={styles.form_group_input}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_group_label}>Телефон:</label>
            <input
              className={styles.form_group_input}
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              pattern="\+?[0-9\s\-\(\)]+"
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_group_label}>Адрес:</label>
            <textarea
              className={styles.form_group_textarea}
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className={styles.form_actions}>
            <button type="submit" className={styles.profile_btns}>
              Сохранить
            </button>
            <button
              type="button"
              className={styles.profile_btns}
              onClick={() => setIsEditing(false)}
            >
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1 className={styles.name}>
            <span>
              {user?.firstName} {user?.lastName}
            </span>
            <FaEdit
              className={styles.edit_icon}
              onClick={() => setIsEditing(true)}
            />
          </h1>
          <h4 className={styles.user_email}>Почта: {user?.email}</h4>
          {user?.phoneNumber && (
            <h4 className={styles.user_phone}>Телефон: {user.phoneNumber}</h4>
          )}
          {user?.address && (
            <h4 className={styles.user_address}>Адрес: {user.address}</h4>
          )}
        </>
      )}

      {!isChanging && (
        <button
          className={styles.profile_btns}
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
};

export default Profile;