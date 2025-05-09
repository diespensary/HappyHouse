import React, { useEffect } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

import './Header.css'
import { Link, useNavigate } from 'react-router';
import useStore from '../../store/store';


function Header() {
	//let [cartOpen, setCartOpen] = useState(false) //хук состояния, по умолчанию false (корзина закрыта)
	const { orders } = useStore();
	const { user, cart, clearUser } = useStore();
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
	<header className='container'>
		<div className='containr  navbarr'>
			<span className='logo col-4'>
				<Link to='/HappyHouse/main' className='link'>
					Happy House
				</Link>
			</span>
			
			<ul className='nav col-8'>
				<li ><Link to='/HappyHouse/main' className='link'>Главная </Link></li>			
				<li ><Link to='/HappyHouse/orders' className='link'>Заказы </Link></li>						
				<li>
					<Link to='/HappyHouse/profile' className='link profile-icon'>
						<MdManageAccounts style={{'font-size':20}} />
						{/* <span style={{'font-size':12}}>{user.firstName}</span> */}
						<span style={{'font-size':12}}>{userFirstName}</span>

					</Link>
				</li>				
				<li className='cart-link'>
					<Link to="/HappyHouse/cart" className='link'><FaShoppingCart/>({ cart?.length || 0})</Link>
				</li>
				<li>
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
