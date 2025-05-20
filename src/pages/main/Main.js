import React, { useEffect } from 'react'
import Presentation from '../../Components/Presentation/Presentation'
import Categories from '../../Components/Categories/Categories'
import Items from '../../Components/Items/Items'
import useStore from '../../store/store';
import styles from './Main.module.css';

function Main() {
	const { setItems, setCurrentItems, fetchAllProducts } = useStore();
	
		// Функция загрузки товаров
		useEffect(() => {		
			fetchAllProducts();
		}, [setItems, setCurrentItems]);
	
	return (
		<>
			<Presentation/>
			  <div className={`${styles.categ_items} container`}>
				<Categories />
				<Items />
			  </div>
		</>
	)
}

export default Main
