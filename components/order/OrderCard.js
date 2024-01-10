import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

/* NOTES:
Buttons not functioning, need onClick
*/

export default function OrderCard({ orderObj }) {
  return (
    <>
      <Card className="text-center">
        <Card.Header>{orderObj.customer_name}</Card.Header>
        <Card.Body>
          <Card.Title>{orderObj.customer_email}</Card.Title>
          <Card.Text>{orderObj.customer_phone}</Card.Text>
          <Card.Text>{orderObj.order_type}</Card.Text>
          <Card.Text>
            Status: {orderObj.is_closed ? 'Closed' : 'Open'}
          </Card.Text>
          <Link href={`/orders/${orderObj.id}`} passHref>
            <Button variant="primary" as="a">Order Details</Button>
          </Link>
          <Button variant="primary">Edit</Button>
          <Button variant="primary">Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    customer_name: PropTypes.string.isRequired,
    customer_email: PropTypes.string.isRequired,
    customer_phone: PropTypes.string.isRequired,
    order_type: PropTypes.number.isRequired,
    is_closed: PropTypes.bool.isRequired,
  }).isRequired,
};
