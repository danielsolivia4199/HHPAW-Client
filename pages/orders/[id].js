/* eslint-disable global-require */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import moment from 'moment-timezone/moment-timezone-utils';
import { getOrderItems, deleteOrderItem } from '../../utils/data/orderItemData';
import { closeOrder } from '../../utils/data/orderData';
import { createRevenue } from '../../utils/data/revenueData';
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
        const timezone = 'America/Chicago';
        const currentDate = moment().tz(timezone);
        const revenueData = {
          order: parseInt(id, 10),
          tip_amount: parseFloat(tip).toFixed(2),
          payment_type: paymentType,
          order_amount: orderTotal.toString(),
          date: currentDate.format('YYYY-MM-DD'),
        };

        createRevenue(revenueData)
          .then(() => {
          })
          .catch((error) => {
            console.error('Error creating revenue record:', error);
            setError(error);
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

  useEffect(() => {
    const total = orderItems.reduce((sum, item) => sum + parseFloat(item.item.price), 0);
    setOrderTotal(total);
  }, [orderItems]);

  const handleDeleteFromOrder = (itemId) => {
    deleteOrderItem(itemId)
      .then(() => {
        const updatedItems = orderItems.filter((item) => item.id !== itemId);
        setOrderItems(updatedItems);
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
      <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Details for Order #{id}</h1>
      <div className="item-cards-container">
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
      <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}> Total: ${orderTotal.toFixed(2)}</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
        marginTop: '30px',
      }}
      >
        <Link href={`/items/menu?orderId=${id}`} passHref>
          <Button variant="primary" size="lg" as="a">Add Item</Button>
        </Link>
        <span style={{ marginRight: '10px' }} />
        <Button variant="success" size="lg" onClick={handleCloseOrder}>Close Order</Button>
      </div>
      <CloseOrderModal
        show={showCloseOrderModal}
        onHide={() => setShowCloseOrderModal(false)}
        onSubmit={handleSubmitCloseOrder}
        orderTotal={orderTotal}
      />
    </div>
  );
};
export default OrderDetails;
