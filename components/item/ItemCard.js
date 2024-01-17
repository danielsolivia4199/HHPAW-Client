/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Button } from 'react-bootstrap';

export default function ItemCard({
  item, onAddToOrder, onDeleteFromOrder, showAddButton, showDeleteButton,
}) {
  // Call this function when the item is successfully added
  const notify = () => toast('Item added to order');
  const notifyDelete = () => toast('Item removed from order');

  const handleAddToOrder = (itemId) => {
    onAddToOrder(itemId);
    notify();
  };

  const handleDeleteFromOrder = () => {
    onDeleteFromOrder(item.id);
    notifyDelete();
  };

  return (
    <Card className="text-center">
      <Card.Header>{item.name}</Card.Header>
      <Card.Body>
        <Card.Title>{item.price}</Card.Title>
        {showAddButton && (
          <Button variant="primary" onClick={handleAddToOrder}>Add to Order</Button>
        )}
        {showDeleteButton && (
          <Button variant="danger" onClick={handleDeleteFromOrder}>Remove from Order</Button>
        )}
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  onAddToOrder: PropTypes.func,
  onDeleteFromOrder: PropTypes.func,
  showAddButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
};
