import React, { useState } from 'react'
import "./Product.css"
import useStore from '../../store/store'
import { useParams } from 'react-router-dom';
import Bg_block from '../../Components/Bg_block/Bg_block';

const Product_pg = () =>{
  const {items} = useStore()
  const { id } = useParams();
  // const product = items.find((item) => item.id === id);
	const {toggleFavorite, orders} = useStore()

  // проверкa на загрузку данных и наличия товара
  if (!items) return <div className="container">Загрузка данных...</div>
  const product = items.find((item) => item.id === id) 
  if (!product) return <div className="container">Товар не найден</div>

  const isLiked = orders.some((order) => order.id === product.id);

  const handleToggleFavorite  = () => {
    toggleFavorite(product)
  };


  return (
    // <div className="container product_container ">
    //   <div className='row'>
    //   <div className="product_image col-7">
    //     <img src={product.image_path} alt={product.name} />
    //   </div>
    //   <div className="product_details col-5">
    //     <h1>{product.name}</h1>
    //     <p className="product_category">Category: {product.category}</p>
    //     <p className="product_description">{product.desc}</p>
    //     <div className="product_specs">
    //       <h2>Charackteristics:</h2>
    //       <ul>
    //         <li>Wood type: {product.wood_type}</li>
    //         <li>Finish: {product.finish}</li>
    //         <li>Depth: {product.dimensions.depth} см</li>
    //         <li>Width: {product.dimensions.width} см</li>
    //         <li>Height: {product.dimensions.height} см</li>
    //         <li>Weight: {product.weight} кг</li>
    //       </ul>
    //     </div>
    //     <p className="product_price">Price: ${product.price}</p>
    //     <div className={`add_to_likely_btn ${isLiked ? 'active' : ''}`}
    //       onClick={handleToggleFavorite}
    //     >{isLiked ? 'Удалить из корзины' : 'Добавить в корзину'}</div>
    //   </div>
    //   </div>
    // </div>
    <Bg_block >
      <div className='row'>
      <div className="product_image col-7">
        <img src={product.image_path} alt={product.name} />
      </div>
      <div className="product_details col-5">
        <h1>{product.name}</h1>
        <p className="product_category">Category: {product.category}</p>
        <p className="product_description">{product.desc}</p>
        <div className="product_specs">
          <h2>Charackteristics:</h2>
          <ul>
            <li>Wood type: {product.wood_type}</li>
            <li>Finish: {product.finish}</li>
            <li>Depth: {product.dimensions.depth} см</li>
            <li>Width: {product.dimensions.width} см</li>
            <li>Height: {product.dimensions.height} см</li>
            <li>Weight: {product.weight} кг</li>
          </ul>
        </div>
        <p className="product_price">Price: ${product.price}</p>
        <div className={`add_to_likely_btn ${isLiked ? 'active' : ''}`}
          onClick={handleToggleFavorite}
        >{isLiked ? 'Удалить из корзины' : 'Добавить в корзину'}</div>
      </div>
      </div>

    </Bg_block>
  )
}

export default Product_pg