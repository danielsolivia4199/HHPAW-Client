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
        router.push(`/orders/${orderObj.id}`);
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
      <h3>{orderObj.id ? 'Update Order' : 'Create Order'}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Cutsomer Name</Form.Label>
          <Form.Control name="customerName" required value={currentOrder.customerName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control name="customerEmail" required value={currentOrder.customerEmail} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control name="customerPhone" required value={currentOrder.customerPhone} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Order Type</Form.Label>
          <Form.Select name="orderType" required value={currentOrder.orderType} onChange={handleChange}>
            <option value="">Select Order Type</option>
            <option value="In-Person">In-Person</option>
            <option value="Online">Online</option>
            <option value="Phone">Phone</option>
            <option value="Delivery">Delivery</option>
          </Form.Select>

        </Form.Group>
        <Button variant="primary" type="submit">
          {orderObj.id ? 'Update Order' : 'Create Order'}
        </Button>
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
