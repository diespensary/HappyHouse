import React from 'react'
import './profile.css'
import { FaEdit } from "react-icons/fa";
import Bg_block from '../../Components/Bg_block/Bg_block';

function Profile() {
	return (
		// <div className='container profile-block'>
		// 	<h1 className='name'>
		// 		<span>Балагурова Галина Миролюбовна</span>
		// 		<FaEdit className='edit-icon' />
		// 	</h1>
			
			
		// </div>
		<Bg_block header={"Профиль"}>					
			<h1 className='name'>
				<span>Балагурова Галина Миролюбовна</span>
				<FaEdit className='edit-icon' />
			</h1>
			</Bg_block>
	)
}

export default Profile
