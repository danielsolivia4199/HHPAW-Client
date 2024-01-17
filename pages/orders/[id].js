/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getOrderItems, deleteOrderItem } from '../../utils/data/orderItemData';
import { closeOrder } from '../../utils/data/orderData';
import createRevenue from '../../utils/data/revenueData';
import ItemCard from '../../components/item/ItemCard';
import CloseOrderModal from '../../components/revenue/RevenueNode';

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [showCloseOrderModal, setShowCloseOrderModal] = useState(false);

  const handleCloseOrder = () => {
    setShowCloseOrderModal(true);
  };

  const handleSubmitCloseOrder = ({ tip, paymentType }) => {
    closeOrder(id)
      .then(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        const revenueData = {
          order: parseInt(id, 10),
          tip_amount: parseFloat(tip).toFixed(2),
          payment_type: paymentType,
          order_amount: orderTotal.toString(), // Assuming this is the total amount of the order
          date: currentDate, // Current date and time
        };

        createRevenue(revenueData)
          .then(() => {
            // Handle success
          })
          .catch((error) => {
            console.error('Error creating revenue record:', error);
            setError(error); // Handle error
          });
      });
  };

  useEffect(() => {
    if (id) {
      getOrderItems(id)
        .then((items) => {
          setOrderItems(items);
          const total = items.reduce((sum, item) => sum + parseFloat(item.item.price), 0);
          setOrderTotal(total);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching order items:', error);
          setError(error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleDeleteFromOrder = (itemId) => {
    deleteOrderItem(itemId)
      .then(() => {
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
      <Button variant="success" onClick={handleCloseOrder}>Close Order</Button>
      <CloseOrderModal
        show={showCloseOrderModal}
        onHide={() => setShowCloseOrderModal(false)}
        onSubmit={handleSubmitCloseOrder}
        orderTotal={orderTotal}
      />
      <h2>Order Total: ${orderTotal.toFixed(2)}</h2>
    </div>
  );
};
export default OrderDetails;
