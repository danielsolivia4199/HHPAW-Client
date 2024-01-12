import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/order/OrderCard';
import { getOrders } from '../../utils/data/orderData';

function Home() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = () => {
    getOrders().then((data) => setOrders(data));
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <article className="orders">
      <h1>Orders</h1>
      {orders.map((order) => (
        <section key={`order--${order.id}`} className="order">
          <OrderCard orderObj={order} onUpdate={getAllOrders} />
        </section>
      ))}
    </article>
  );
}

export default Home;
