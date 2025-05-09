import React from 'react'
import Item from '../Item/Item'

import './items.css'
import useStore from '../../store/store';

function Items() {
	// const {items, currentItems, addOrder} = useStore();
	const {items, currentItems, addInCart} = useStore();

	return (
		<main className='container'>
			<div className='items row'>
				{currentItems.map(el => (
					<Item key = {el.id} item = {el} onAdd = {addInCart}/> 
				))}
			</div>
		</main>
	)
}

export default Items
