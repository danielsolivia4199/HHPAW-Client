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
        // Include other headers as required, like authorization tokens
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
    return data; // This is the response body from the server
  } catch (error) {
    console.error('Error adding item to order:', error);
    // Handle errors appropriately in your application
  }
};

export { getOrderItems, addItemToOrder };
