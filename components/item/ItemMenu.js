/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import router from 'next/router';
import getItems from '../../utils/data/itemData';
import ItemCard from './ItemCard';
import { addItemToOrder } from '../../utils/data/orderItemData';

const ItemsMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = router.query;

  const handleReturnToOrder = () => {
    router.push(`/orders/${orderId}`);
  };
  useEffect(() => {
    getItems()
      .then((items) => {
        setItems(items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>Error loading items: {error.message}</p>;
  }

  return (
    <div>
      <h2>Menu</h2>
      <Button onClick={handleReturnToOrder} variant="secondary">Return to Order</Button>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onAddToOrder={() => addItemToOrder(orderId, item.id)} />
      ))}
    </div>
  );
};

export default ItemsMenu;
