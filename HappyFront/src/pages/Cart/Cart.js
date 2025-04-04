import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import useStore from '../../store/store';
import Bg_block from '../../Components/Bg_block/Bg_block';

const Cart = () => {
  const {orders, deleteOrder} = useStore();
  return (
    // <div className='container cart'>
    //   <h2>Корзина</h2>
    //   {orders.length === 0 ? (
    //     <p>В корзине пусто</p>
    //   ) : (
    //     <ul className='cart-list'>
    //       {orders.map((order) => (
    //         <li className='cart-item' key={order.id}>
    //           <Link to={`/Shop-react2/product/${order.id}`}>
    //             <img className='cart-item__img' src={order.image_path} alt={order.name} />
    //           </Link>
    //           <div className='cart-item__info'>
    //             <Link to={`/Shop-react2/product/${order.id}`}>
    //               <h3 className='cart-item__title'>{order.name}</h3>
    //               <p className='cart-item__price'>{order.price}$</p>
    //             </Link>
    //           </div>
    //           <button
    //             className='cart-item__delete-btn'
    //             onClick={() => deleteOrder(order.id)}>
    //             Удалить
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>

    
    <Bg_block header={'Корзина'}>
      {orders.length === 0 ? (
        <p>В корзине пусто</p>
      ) : (
        <ul className='cart-list'>
          {orders.map((order) => (
            <li className='cart-item' key={order.id}>
              <Link to={`/Shop-react2/product/${order.id}`}>
                <img className='cart-item__img' src={order.image_path} alt={order.name} />
              </Link>
              <div className='cart-item__info'>
                <Link to={`/Shop-react2/product/${order.id}`}>
                  <h3 className='cart-item__title'>{order.name}</h3>
                  <p className='cart-item__price'>{order.price}$</p>
                </Link>
              </div>
              <button
                className='cart-item__delete-btn'
                onClick={() => deleteOrder(order.id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </Bg_block>
  );
};

export default Cart;