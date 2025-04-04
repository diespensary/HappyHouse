import React from 'react'

import './item.css'
import { Link } from 'react-router-dom'

function Item({item, onAdd}) {
	// const imgPath = require(`./img/${props.item.img}`).default;

	return (
	
			<div className='item  '>

				<Link to={`/Shop-react2/product/${item.id}`}  className='item_link'>	
					<img src={item.image_path} alt={item.name}/>
					<h2 className='item-h2'> {item.name} </h2>
					<p>{item.wood_type}, {item.finish} finish</p>
					<b>{item.price}$</b>
				</Link>
				<div className='btn_add' onClick={() => onAdd(item)}> + </div>
			</div>

	)
}

export default Item
