/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function ItemCard({ item, onAddToOrder }) {
  return (
    <>
      <Card className="text-center">
        <Card.Header>{item.name}</Card.Header>
        <Card.Body>
          <Card.Title>{item.price}</Card.Title>
        </Card.Body>
        <Button variant="primary" onClick={() => onAddToOrder(item.id)}>Add to Order</Button>

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
};
