/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';

function RevenueCard({
  totalRevenue, totalTips, paymentTypeCounts, firstDate, lastDate,
}) {
  return (
    <Card className="text-center">
      <Card.Header as="h5">Revenue Statistics</Card.Header>
      <Card.Body>
        <Card.Title>Total Revenue: ${totalRevenue.toFixed(2)}</Card.Title>
        <Card.Text>Total Tips: ${totalTips.toFixed(2)}</Card.Text>
        <div>
          <h6>Payment Type Breakdown</h6>
          {Object.entries(paymentTypeCounts).map(([paymentType, count]) => (
            <div key={paymentType}>{paymentType}: {count}</div>
          ))}
        </div>

        <Card.Text>
          <strong>Date Range:</strong> {firstDate} to {lastDate}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RevenueCard;
