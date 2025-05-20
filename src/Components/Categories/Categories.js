import React, { useState } from 'react'
import useStore from '../../store/store';

import styles from './categories.module.css'


function Categories() {
	const { chooseCategory } = useStore();
	
  const [categories] = useState([
    { key: "all", name: "Все" },
    { key: 1, name: "Стулья" },
    { key: 2, name: "Диваны" },
    { key: 3, name: "Столы" },
    { key: "lamp", name: "Лампы" },
    // { key: "beds", name: "Кровати" },
    // { key: "cupboards", name: "Шкафы" },

		{ key: "garden", name: "Сад" },
		// { key: "stool", name: "Стулья" },
		{ key: "chair", name: "Кресла" },
		{ key: "table", name: "Столы" },
		// { key: "desk", name: "desk" },
		{ key: "matress", name: "Матрасы" },
		{ key: "mirror", name: "Зеркала" },
		// { key: "wardrove", name: "wardrove" },

  ]);
	return (
		<div className={`${styles.categories} container`}>
			<div className='row'>
				{categories.map(el =>
					<div 
					key={el.key} className={`${styles.category} col`} 
					onClick={() => chooseCategory(el.key)}> {el.name} </div>
				)}
			</div>
			
		</div>
	)
}

export default Categories
