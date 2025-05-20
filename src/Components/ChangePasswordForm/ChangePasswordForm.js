import React, { useState } from 'react'
import useStore from '../../store/store';

const ChangePasswordForm = ({ setIsChanging, onSuccess }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = useStore(state => state.user.id);
  const updateUserPassword = useStore(state => state.updateUserPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
    setError('Пароли не совпадают');
    return;
    }
    try {
    await updateUserPassword(userId, formData.oldPassword, formData.newPassword);
    setSuccess('Пароль успешно изменен');
    setError('');
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setTimeout(() => {
      onSuccess();
    }, 3000);
    } catch (err) {
    setError(err.response?.data?.message || err.message);
    console.error('Password change error:', err);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="password-change-form">
      <h3>Смена пароля</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Старый пароль:</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Новый пароль:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            
          />
        </div>

        <div className="form-group">
          <label>Подтвердите пароль:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-save profile-btns">
            Сменить пароль
        </button>
        <button 
            type="button" 
            className="btn-cancel profile-btns"
            onClick={() => setIsChanging(false)}>
            Отмена 
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm