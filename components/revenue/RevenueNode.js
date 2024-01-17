/* eslint-disable react/prop-types */
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';

const CloseOrderModal = ({
  show, onHide, onSubmit, orderTotal,
}) => {
  const [tip, setTip] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    onSubmit({ tip, paymentType });
    onHide();
    router.push('/orders');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Close Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Order Total: ${orderTotal.toFixed(2)}</p>
        {tip && !Number.isNaN(tip) && (
        <p>Total with Tip: ${(orderTotal + parseFloat(tip)).toFixed(2)}</p>
        )}
        <Form>
          <Form.Group>
            <Form.Label>Tip Amount</Form.Label>
            <Form.Control type="number" value={tip} onChange={(e) => setTip(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Payment Type</Form.Label>
            <Form.Control as="select" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
              <option>Select Payment Type</option>
              <option>Credit</option>
              <option>Debit</option>
              <option>Cash</option>
              <option>Check</option>
              <option>Mobile Payment</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CloseOrderModal;
