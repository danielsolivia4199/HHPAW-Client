import { clientCredentials } from '../client';

const getOrderItems = (orderId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems/${orderId}/items_for_order`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line consistent-return
const addItemToOrder = async (orderId, itemId) => {
  try {
    const response = await fetch('http://localhost:8000/orderitems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        item_id: itemId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding item to order:', error);
  }
};

const deleteOrderItem = async (orderItemId) => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/orderitems/${orderItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response status is 204 (No Content)
    if (response.status === 204) {
      return; // Simply return as there's no content to parse
    }

    // eslint-disable-next-line consistent-return
    return response.json(); // If your backend does return data, parse it
  } catch (error) {
    console.error('Error deleting order item:', error);
    throw error;
  }
};

export { getOrderItems, addItemToOrder, deleteOrderItem };
