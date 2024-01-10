/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
import React, { useEffect, useState } from 'react';
import getItems from '../../utils/data/itemData';
import ItemCard from './ItemCard';

const ItemsMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h2>Items Menu</h2>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemsMenu;
