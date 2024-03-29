/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import router from 'next/router';
import getItems from '../../utils/data/itemData';
import ItemCard from './ItemCard';
import { addItemToOrder } from '../../utils/data/orderItemData';

const ItemsMenu = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = router.query;

  const handleReturnToOrder = () => {
    router.push(`/orders/${orderId}`);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  useEffect(() => {
    getItems()
      .then((fetchedItems) => {
        setItems(fetchedItems);
        setFilteredItems(fetchedItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => item.name.toLowerCase().includes(searchQuery));
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>Error loading items: {error.message}</p>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Menu</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleReturnToOrder} variant="success" size="lg" style={{ marginBottom: '10px' }}>
          Return to Order
        </Button>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search items"
          onChange={handleSearchChange}
        />
      </InputGroup>
      <div className="item-cards-container">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} showAddButton onAddToOrder={() => addItemToOrder(orderId, item.id)} />
        ))}
      </div>
    </div>
  );
};

export default ItemsMenu;
