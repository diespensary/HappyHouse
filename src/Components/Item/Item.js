import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'
import useStore from '../../store/store'

function Item({item, onAdd}) {
	const userId = localStorage.getItem('userId');

	// const imgPath = require(`./img/${props.item.img}`).default;
	// const {addToCart} = useStore();

	return (
	
			<div className='item  '>

				<Link to={`/HappyHouse/product/${item.productId}`}  className='item_link'>	
					<img src={item.image_url} alt={item.name}/>
					<h2 className='item-h2'> {item.name} </h2>
					{/* <p>{item.wood_type}, {item.finish} finish</p> */}
					<p> {item.finish} finish</p>
					<b>{item.price}₽</b>
				</Link>
				<div className='btn_add' 
				// onClick={() => onAdd(item)}
				onClick={() => useStore.getState().addToCart(userId, item.productId, 1)}
				>
				+ </div>
			</div>

	)
}

export default Item
