import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteOrder } from '../../utils/data/orderData';

export default function OrderCard({ orderObj, onUpdate }) {
  const router = useRouter();

  const deleteThisOrder = () => {
    if (window.confirm('Delete this order?')) {
      deleteOrder(orderObj.id).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>Order #{orderObj.id}</Card.Header>
        <Card.Body>
          <Card.Title>{orderObj.customer_name}</Card.Title>
          <Card.Title>{orderObj.customer_email}</Card.Title>
          <Card.Text>{orderObj.customer_phone}</Card.Text>
          <Card.Text>{orderObj.order_type}</Card.Text>
          <Card.Text>
            Status: {orderObj.is_closed ? 'Closed' : 'Open'}
          </Card.Text>
          <Link href={`/orders/${orderObj.id}`} passHref>
            <Button variant="primary" as="a">Order Details</Button>
          </Link>
          <Button
            variant="primary"
            onClick={() => {
              router.push(`/orders/edit/${orderObj.id}`);
            }}
          >Edit
          </Button>
          <Button variant="primary" onClick={deleteThisOrder}>Delete</Button>
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
    order_type: PropTypes.string.isRequired,
    is_closed: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
