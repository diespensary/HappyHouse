import React, { useEffect } from 'react';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import useStore from '../../store/store';
import Bg_block from '../../Components/Bg_block/Bg_block';

const Cart = () => {
  const { cart, loading, error, fetchCart, removeFromCart, updateCartItem, user, items, addOrder} = useStore();
  const userId = localStorage.getItem('userId'); 

  const handleAddOrder = async () => {
    try {
      if (!user?.id) return;
      await addOrder(user.id);
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
    }
  };  

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId, fetchCart]);

  const handleRemove = async (cartItemId) => {
    await removeFromCart(cartItemId);
  };

  if (loading) return <Bg_block header="Корзина"><p>Загрузка...</p></Bg_block>;
  if (error) return <Bg_block header="Ошибка"><p>{error}</p></Bg_block>;
  return (
        
    <Bg_block header={'Корзина'}>
      {
      !cart || cart.length === 0 ? (
        <p>В корзине пусто</p>
      ) : 
      (
        <>
        <button className={`${styles.make_an_order__btn}`}
          onClick={handleAddOrder}>
          Оформить заказ
        </button>
        <ul className={`${styles.cart_list}`}>
          {(cart || []).reverse().map((item) => {
            const product = items.find(p => p.productId === item.productId)
            console.log(user.id, userId)
            return(
              <li className={`${styles.cart_item}`} key={product.productId}>
                <Link to={`/HappyHouse/product/${product.productId}`}>
                  <img className={`${styles.cart_item__img}`} src={product.imageUrl} alt={product.name} />
                </Link>
                <div className={`${styles.cart_item__info}`}>
                  <Link to={`/HappyHouse/product/${product.productId}`}>
                    <h3 className={`${styles.cart_item__title}`}>{product.name}</h3>
                    <p className={`${styles.cart_item__price}`}>{product.price}₽</p>
                  </Link>
  
                  <div className={`${styles.quantity_control}`}>
                    <button 
                      className={`${styles.quantity_control_button}`}
                      onClick={() => updateCartItem(item.cartItemId, item.count - 1)}
                      disabled={item.count <= 1}
                    >-</button>
                    <span className={`${styles.quantity_control_span}`}>{item.count}</span>
                    <button 
                      className={`${styles.quantity_control_button}`}
                      onClick={() =>  updateCartItem(item.cartItemId, item.count + 1)}
                    >+</button>
                  </div>
  
                </div>
                <button
                  className={`${styles.cart_item__delete_btn}`}
                  // onClick={() => deleteOrder(order.id)}>
                  onClick={() => handleRemove(item.cartItemId)}>  
                  Удалить
                </button>
              </li>
            )})} 
        </ul>
      </>)
      }
    </Bg_block>
  );
};

export default Cart;