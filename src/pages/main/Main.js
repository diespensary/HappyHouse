import React, { useEffect } from 'react'
import Presentation from '../../Components/Presentation/Presentation'
import Categories from '../../Components/Categories/Categories'
import Items from '../../Components/Items/Items'
import useStore from '../../store/store';


function Main() {
	const { setItems, setCurrentItems } = useStore();
		// const { setItems, setCurrentItems } = useState();
		const token = localStorage.getItem('accessToken');
	
		// Функция загрузки товаров
		useEffect(() => {
			const fetchData = async () => {
			try {
				// const response = await fetch("https://furniture-api.fly.dev/v1/products?limit=100&sort=name_asc");
				const response = await fetch("http://localhost:8080/happyhouse/products",{
				headers: {
					'Authorization': `Bearer ${token}`
				}
				});
				if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
				const data = await response.json();
				// setItems(data.data);
				// setCurrentItems(data.data);
				
				setItems(data);
				setCurrentItems(data);
			} catch (error) {
				console.error("Ошибка загрузки данных:", error);
			}
			};
		
			fetchData();
		}, [setItems, setCurrentItems]);
	
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
