import React from 'react'
import styles from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';


function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.title}`}>404</h1>
      <p className={`${styles.message}`}>Страница не найдена</p>
      <button className={`${styles.button}`} onClick={() => navigate ('/HappyHouse/main')}>
        Вернуться на главную
      </button>
    </div>
  )
}

export default NotFound