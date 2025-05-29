import { useEffect } from 'react';
import Bg_block from '../../Components/Bg_block/Bg_block';
import useStore from '../../store/store';
import styles from './Orders.module.css';

const Orders = () => {
  const {fetchOrders, error, orders} = useStore();
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
      {/* {!orders || orders.length === 0 ? ( */}
      {orders.length === 0 ? ( 
        <div>У вас пока нет заказов</div>
      ) : (
        orders?.slice().reverse().map((order, orderNum) => (
          <div className={styles.order} key={order.orderId} >                           
            <h3>Заказ №{orders.length - orderNum} от {formatDate(order.createdAt)}</h3>              
            <div >
              Итого: {order.totalAmount.toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2
              })}
            </div>    

            <h5>Состав заказа:</h5>
            {order.orderItems.map((item) => (
              <div key={item.orderItemId} >
                <span >Товар #{item.productId}</span>
                <span >× {item.count}</span>
                <div >
                  {item.price.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                    minimumFractionDigits: 2
                  })}
                </div>
              </div>
            ))}
            
          </div>
        ))
      )}
    </Bg_block>
  );
};

export default Orders;