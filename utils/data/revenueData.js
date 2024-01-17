import { clientCredentials } from '../client';

const createRevenue = (revenue) => new Promise((resolve, reject) => {
  console.log('Sending Revenue Data:', revenue); // Log data being sent
  fetch(`${clientCredentials.databaseURL}/revenues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(revenue),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default createRevenue;
