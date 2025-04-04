import React from 'react'
import Item from '../Item/Item'

import './items.css'
import useStore from '../../store/store';

function Items() {
	const {items, currentItems, addOrder} = useStore();
	return (
		<main className='container'>
			<div className='items row'>
				{currentItems.map(el => (
					<Item key = {el.id} item = {el} onAdd = {addOrder}/> 
				))}
			</div>
		</main>
	)
}

export default Items
