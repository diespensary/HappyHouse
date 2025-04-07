import React from 'react'
import Presentation from '../../Components/Presentation/Presentation'
import Categories from '../../Components/Categories/Categories'
import Items from '../../Components/Items/Items'

function Main() {
	return (
		<>
			<Presentation/>
			  <div className='categ_items container'>
				<Categories />
				<Items />
			  </div>
		</>
	)
}

export default Main
