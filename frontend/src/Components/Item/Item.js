import React from 'react'
import styles from './item.module.css'
import { Link } from 'react-router-dom'
import useStore from '../../store/store'

function Item({item}) {
	const userId = localStorage.getItem('userId');

	return (
	
			<div className={`${styles.item}  `}>

				<Link to={`/HappyHouse/product/${item.productId}`}  className={`${styles.item_link}`}>	
					<img className={`${styles.img}`} src={item.imageUrl} alt={item.name}/>
					<h3 className={`${styles.item_h2}`}> {item.name} </h3>
					{/* <p> {item.finish} finish</p> */}
					<div >{item.description}</div>
					<b>{item.price}₽</b>
				</Link>
				<div className={`${styles.btn_add}`} 
					onClick={() => useStore.getState().addToCart(userId, item.productId, 1)}
				> + </div>
			</div>

	)
}

export default Item
