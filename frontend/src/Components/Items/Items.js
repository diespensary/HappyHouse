import React from 'react'
import Item from '../Item/Item'

import styles from './items.module.css'
import useStore from '../../store/store';

function Items() {
	const {currentItems, addInCart} = useStore();

	return (
		<main className='container'>
			<div className={`${styles.items} row`}>
				{currentItems.map(el => (
					<Item key = {el.id} item = {el} onAdd = {addInCart}/> 
				))}
			</div>
		</main>
	)
}

export default Items
