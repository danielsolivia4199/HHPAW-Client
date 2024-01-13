import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getOrderItems } from '../../utils/data/orderItemData';
import ItemCard from '../../components/item/ItemCard';

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getOrderItems(id)
        .then((items) => {
          setOrderItems(items);
          setLoading(false);
        })
        // eslint-disable-next-line arrow-parens, no-shadow
        .catch(error => {
          console.error('Error fetching order items:', error);
          setError(error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>Error loading order details: {error.message}</p>;
  }

  return (
    <div>
      <h2>Order Details for Order: {id}</h2>
      <Link href={`/items/menu?orderId=${id}`} passHref>
        <Button variant="primary" as="a">Add Item</Button>
      </Link>
      {orderItems.map((orderItem) => (
        <ItemCard key={orderItem.id} item={orderItem.item} />
      ))}

    </div>
  );
};

export default OrderDetails;
