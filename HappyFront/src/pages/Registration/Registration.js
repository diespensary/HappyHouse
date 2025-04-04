import React from 'react'

import './Registration.css'

import { useNavigate } from 'react-router'

function Registration() {
	const navigate=useNavigate();
	
	return ( 
		<div className='register_page'>
			{/* <h1 className='logo'>Happy House</h1> */}
			<div className='registr'>
				<h2>Добро пожаловать</h2>
			<form action="" method="get">
				
					{/* <label for="name">Введите имя:</label> */}
					<div className='col'>
						<input type="text" placeholder="name" id="name" required/>
					</div>
				
				<div className='col'>
					{/* <label for="email">Введите email:</label> */}
					<input type="email" placeholder="email" id="email" required/>
				</div>
				<button className="reg_btn" 
					type="submit"
					onClick={() => navigate("/HappyHouse/main")}
				>Регистрация</button>
				<div className='go_to_register'
					onClick={() => navigate("/HappyHouse/login")}
				>на страницу входа</div>
			</form>
			</div>
			
		</div>
	)
}

export default Registration
