import { useEffect, useState } from 'react';
import Bg_block from '../../Components/Bg_block/Bg_block';
import './Orders.css'; // Создайте новый файл стилей
import useStore from '../../store/store';

const Orders = () => {
  const {fetchOrders, loading, error, orders} = useStore();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId, fetchOrders]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // if (loading) return <Bg_block header="Заказы"><div className="loading">Загрузка заказов...</div></Bg_block>;
  if (error) return <Bg_block header="Заказы"><div className="error">Ошибка: {error}</div></Bg_block>;

  return (
    <Bg_block header="История заказов">
      <div className="orders-container">
        {/* {!orders || orders.length === 0 ? ( */}
        {orders.length === 0 ? ( // Убрана проверка на null

          <div className="empty-orders">У вас пока нет заказов</div>
        ) : (
          orders?.slice().reverse().map((order, orderNum) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <div className="order-meta">
                  {/* <h3>Заказ №{order.orderId}</h3> */}
                  <h3>Заказ {formatDate(order.createdAt)}</h3>
                  {/* <span className="order-date">{formatDate(order.createdAt)}</span> */}
                </div>
                <div className="order-total">
                  Итого: {order.totalAmount.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                    minimumFractionDigits: 2
                  })}
                </div>
              </div>

              <div className="order-items">
                <h5>Состав заказа:</h5>
                {order.orderItems.map((item) => (
                  <div key={item.orderItemId} className="order-item">
                    <div className="item-info">
                      <span className="item-name">Товар #{item.productId}</span>
                      <span className="item-quantity">× {item.count}</span>
                    </div>
                    <div className="item-price">
                      {item.price.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        minimumFractionDigits: 2
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Bg_block>
  );
};

export default Orders;