/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Button } from 'react-bootstrap';

export default function ItemCard({ item, onAddToOrder, showAddButton }) {
  // Call this function when the item is successfully added
  const notify = () => toast('Item added to order');

  const handleAddToOrder = (itemId) => {
    onAddToOrder(itemId);
    notify(); // Trigger the toast notification
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>{item.name}</Card.Header>
        <Card.Body>
          <Card.Title>{item.price}</Card.Title>
          {showAddButton && (
            <Button variant="primary" onClick={() => handleAddToOrder(item.id)}>Add to Order</Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  onAddToOrder: PropTypes.func,
  showAddButton: PropTypes.bool,
};
