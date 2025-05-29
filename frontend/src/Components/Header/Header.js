import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router';
import useStore from '../../store/store';


function Header() {
	
	const { cart, clearUser } = useStore();
	const navigate = useNavigate();
  
	const handleLogout = () => {
	// Очищаем хранилище
		clearUser();

		localStorage.removeItem('app-storage'); // Очистка сохраненных данных
	  
	  // Перенаправляем на страницу входа
	  navigate('/HappyHouse/login');
	};

	const userFirstName = useStore(state => state.user.firstName);

	return (
	<header className={`${styles.header} container`}>
		<div className={`${styles.navbarr} container`}>
			<span className={`${styles.logo} col-4`}>
				<Link to='/HappyHouse/main' className='link'>
					Happy House
				</Link>
			</span>
			
			<ul className={`${styles.nav} col-8`}>
				<li className={`${styles.header_li}`} ><Link to='/HappyHouse/main' className='link'>Главная </Link></li>			
				<li className={`${styles.header_li}`} ><Link to='/HappyHouse/orders' className='link'>Заказы </Link></li>						
				<li className={`${styles.header_li}`}>
					<Link to='/HappyHouse/profile' className={`${styles.profile_icon} link`}>
						<MdManageAccounts style={{'font-size':20}} />
						<span style={{'font-size':12}}>{userFirstName}</span>
					</Link>
				</li>				
				<li className={`${styles.cart_link, styles.header_li}`}>
					<Link to="/HappyHouse/cart" className='link'><FaShoppingCart/>({ cart?.length || 0})</Link>
				</li>
				<li className={`${styles.header_li}`}>
					<Link to='/HappyHouse/login' 
						className='link'
						onClick={handleLogout}>
						Выход
					</Link>
				</li>
			</ul> 
		</div>
			
	</header>
	)
}

export default Header
