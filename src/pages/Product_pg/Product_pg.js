import React, { useEffect, useState } from 'react'
import "./Product.css"
import useStore from '../../store/store'
import { useParams } from 'react-router-dom'
import Bg_block from '../../Components/Bg_block/Bg_block'

const Product_pg = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {  cart, removeFromCart, toggleCart } = useStore()

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
          setError('Требуется авторизация')
          setLoading(false)
          return
        }

        const response = await fetch(`http://localhost:8080/happyhouse/products/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('accessToken')
            window.location.href = '/login'
          }
          throw new Error('Ошибка загрузки товара')
        }

        const data = await response.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProductData()
    else {
      setError('Товар не найден')
      setLoading(false)
    }
  }, [id])

  // const handleToggleFavorite = () => {
  //   if (product) {
  //     toggleFavorite(product)
  //   }
  // }
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
        <div className="product_image col-7">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product_details col-5">
          <h1>{product.name}</h1>
          <p className="product_description">{product.description}</p>
          <div className="product_specs">
            <h2>Характеристики:</h2>
            <ul>
              <li>Артикул: {product.productId}</li>
              <li>Категория: {product.categoryId}</li>
            </ul>
          </div>
          <p className="product_price">Цена: {product.price} ₽</p>
          <button
            className={`add_to_likely_btn ${isLiked ? 'active' : ''}`}
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