import React, { useEffect, useState } from 'react';
import Bg_block from '../../Components/Bg_block/Bg_block';
import './Orders.css'; // Создайте новый файл стилей

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`http://localhost:8080/happyhouse/orders/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  if (loading) return <Bg_block header="Заказы"><div className="loading">Загрузка заказов...</div></Bg_block>;
  if (error) return <Bg_block header="Заказы"><div className="error">Ошибка: {error}</div></Bg_block>;

  return (
    <Bg_block header="История заказов">
      <div className="orders-container">
        {orders.length === 0 ? (
          <div className="empty-orders">У вас пока нет заказов</div>
        ) : (
          orders.map((order, orderNum=1) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <div className="order-meta">
                  {/* <h3>Заказ №{order.orderId}</h3> */}
                  <h3>Заказ №{orderNum++}</h3>
                  <span className="order-date">{formatDate(order.createdAt)}</span>
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
                <h4>Состав заказа:</h4>
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