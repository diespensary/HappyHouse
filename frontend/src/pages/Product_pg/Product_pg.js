import React, { useEffect } from 'react'
import styles from "./Product.module.css"
import useStore from '../../store/store'
import { useParams } from 'react-router-dom'
import Bg_block from '../../Components/Bg_block/Bg_block'

const Product_pg = () => {
  const { id } = useParams()
  const {fetchProduct,  error, loading, cart, toggleCart } = useStore()
  const product = useStore(state => 
    state.items.find(p => p.productId === Number(id))
  )  

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

    const handleToggleCart = () => {
    if (product) {
      toggleCart(product)
    }
  }


  const isLiked = product ? cart.some(item => item.productId === product.productId) : false

  if (loading) return <div className="container">Загрузка...</div>
  if (error) return <div className="container">Ошибка: {error}</div>
  if (!product) return <div className="container">Товар не найден</div>

  return (
    <Bg_block>
      <div className='row'>
        <div className={`col-7`}>
          <img className={styles.image} 
            src={product.imageUrl} 
            alt={product.name} 
          />
        </div>
        <div className=" col-5">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div>
            <h2>Характеристики:</h2>
            <ul>
              <li>Артикул: {product.productId}</li>
              <li>Категория: {product.categoryId}</li>
            </ul>
          </div>
          <p>Цена: {product.price} ₽</p>
          <button
            className={`${styles.add_to_likely_btn} ${isLiked ? styles.active : ''}`}
            // onClick={handleRemove(cart.cartItemId)}
            onClick={handleToggleCart}
          >
            {isLiked ? 'Удалить из корзины' : 'Добавить в корзину'}
          </button>
        </div>
      </div>
    </Bg_block>
  )
}

export default Product_pg