/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createOrder, updateOrder } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  orderType: '',
  isClosed: false,
};

const OrderForm = ({ orderObj }) => {
  const [currentOrder, setCurrentOrder] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (orderObj.id) {
      setCurrentOrder({
        id: orderObj.id,
        customerName: orderObj.customer_name,
        customerEmail: orderObj.customer_email,
        customerPhone: orderObj.customer_phone,
        orderType: orderObj.order_type,
        isClosed: orderObj.is_closed,
      });
    }
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (orderObj.id) {
        await updateOrder(currentOrder, user.uid);
        router.push('/orders');
      } else {
        const newOrder = await createOrder(currentOrder, user.uid);
        router.push(`/orders/${newOrder.id}`);
      }
    } catch (error) {
      console.error('Error submitting the order:', error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>{orderObj.id ? 'Update Order' : 'Create Order'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="customerName">Customer Name</Form.Label>
          <Form.Control id="customerName" name="customerName" required value={currentOrder.customerName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="customerEmail">Customer Email</Form.Label>
          <Form.Control id="customerEmail" name="customerEmail" required value={currentOrder.customerEmail} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="customerPhone">Customer Phone</Form.Label>
          <Form.Control id="customerPhone" name="customerPhone" required value={currentOrder.customerPhone} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="orderType">Order Type</Form.Label>
          <Form.Select id="orderType" name="orderType" required value={currentOrder.orderType} onChange={handleChange}>
            <option value="">Select Order Type</option>
            <option value="In-Person">In-Person</option>
            <option value="Phone">Phone</option>
            <option value="Delivery">Delivery</option>
          </Form.Select>
        </Form.Group>
        <div style={{
          display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '20px',
        }}
        >
          <Button variant="primary" size="lg" type="submit">
            {orderObj.id ? 'Update Order' : 'Create Order'}
          </Button>
        </div>
      </Form>
    </>
  );
};

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    customerEmail: PropTypes.string,
    customerPhone: PropTypes.string,
    orderType: PropTypes.string,
    isClosed: PropTypes.bool,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};

export default OrderForm;
