/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getOrderItems, deleteOrderItem } from '../../utils/data/orderItemData';
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

  const handleDeleteFromOrder = (itemId) => {
    deleteOrderItem(itemId) // Assuming deleteOrderItem is your API call to delete the item
      .then(() => {
        // Update the state to reflect the deletion
        setOrderItems(orderItems.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error('Error deleting order item:', error);
        setError(error);
      });
  };

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>Error loading order details: {error.message}</p>;
  }

  return (
    <div>
      <h2>Details for Order #{id}</h2>
      <Link href={`/items/menu?orderId=${id}`} passHref>
        <Button variant="primary" as="a">Add Item</Button>
      </Link>
      {orderItems.map((orderItem) => (
        <ItemCard
          key={orderItem.id}
          item={orderItem.item}
          showAddButton={false}
          showDeleteButton
          onDeleteFromOrder={() => handleDeleteFromOrder(orderItem.id)}
        />
      ))}

    </div>
  );
};

export default OrderDetails;
