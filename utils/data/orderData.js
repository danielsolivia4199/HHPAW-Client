import { clientCredentials } from '../client';

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createOrder = (order, userId) => new Promise((resolve, reject) => {
  const payload = {
    ...order,
    employee: userId, // Add the 'employee' field
  };
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (payload, uid) => new Promise((resolve, reject) => {
  const updatedPayload = {
    ...payload,
    employee: payload.employee || uid, // Use the existing 'employee' field or fallback to uid
  };
  fetch(`${clientCredentials.databaseURL}/orders/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(updatedPayload),
  })
    .then(resolve)
    .catch(reject);
});

export { getOrders, createOrder, updateOrder };
