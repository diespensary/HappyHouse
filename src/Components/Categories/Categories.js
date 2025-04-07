import React, { useState } from 'react'

import './categories.css'
import useStore from '../../store/store';


function Categories() {
	const { chooseCategory } = useStore();
	
  const [categories] = useState([
    { key: "all", name: "Все" },
    { key: "chairs", name: "Стулья" },
    { key: "sofa", name: "Диваны" },
    { key: "tables", name: "Столы" },
    { key: "lamp", name: "Лампы" },
    // { key: "beds", name: "Кровати" },
    // { key: "cupboards", name: "Шкафы" },

		{ key: "garden", name: "garden" },
		{ key: "stool", name: "stool" },
		{ key: "chair", name: "chair" },
		{ key: "table", name: "table" },
		// { key: "desk", name: "desk" },
		{ key: "matress", name: "matress" },
		{ key: "mirror", name: "mirror" },
		// { key: "wardrove", name: "wardrove" },



  ]);
	return (
		<div className='categories container '>
			<div className='row'>
				{categories.map(el =>
					<div 
					key={el.key} className='category col' 
					onClick={() => chooseCategory(el.key)}> {el.name} </div>
				)}
			</div>
			
		</div>
	)
}

export default Categories
