import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/order/OrderCard';
import { getOrders } from '../../utils/data/orderData';

function Home() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = () => {
    getOrders().then((data) => {
      const sortedOrders = data.sort((a, b) => {
        if (a.is_closed && !b.is_closed) {
          return 1;
        } if (!a.is_closed && b.is_closed) {
          return -1;
        }
        return b.id - a.id;
      });

      setOrders(sortedOrders);
    });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Orders</h1>
      <article className="orders">
        {orders.map((order) => (
          <section key={`order--${order.id}`} className="order">
            <OrderCard orderObj={order} onUpdate={getAllOrders} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
