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

export default getOrderItems;
