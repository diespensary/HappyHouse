import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

import './Header.css'
import { Link } from 'react-router';
import useStore from '../../store/store';


function Header() {
	//let [cartOpen, setCartOpen] = useState(false) //хук состояния, по умолчанию false (корзина закрыта)
	const { orders } = useStore();
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
						<span style={{'font-size':12}}>Имя</span>
					</Link>
				</li>				
				<li className='cart-link'>
					<Link to="/HappyHouse/cart" className='link'><FaShoppingCart/>({orders.length})</Link>
				</li>
				<li><Link to='/HappyHouse/login' className='link'>Выход</Link></li>
			</ul> 
		</div>
			
	</header>
	)
}

export default Header
