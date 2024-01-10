import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

/* NOTES:
Buttons not functioning, need onClick
*/

export default function ItemCard({ item }) {
  return (
    <>
      <Card className="text-center">
        <Card.Header>{item.name}</Card.Header>
        <Card.Body>
          <Card.Title>{item.price}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};
