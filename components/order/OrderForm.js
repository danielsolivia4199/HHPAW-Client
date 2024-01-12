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
        customerName: orderObj.customerName,
        customerEmail: orderObj.customerEmail,
        customerPhone: orderObj.customerPhone,
        orderType: orderObj.orderType,
        isClosed: orderObj.isClosed, // Update based on actual status
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
        await updateOrder(currentOrder, user.uid); // user.uid is sent as the employee UID
      } else {
        await createOrder(currentOrder, user.uid); // user.uid is sent as the employee UID
      }
      router.push('/orders');
    } catch (error) {
      console.error('Error submitting the order:', error);
    }
  };

  return (
    <>
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
