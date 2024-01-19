/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';

function RevenueCard({
  totalRevenue, totalTips, paymentTypeCounts, firstDate, lastDate,
}) {
  return (
    <Card className="text-center">
      <Card.Header as="h5" className="header-style">Revenue Statistics</Card.Header>
      <Card.Body>
        <Card.Title className="title-style">Total Revenue: ${totalRevenue.toFixed(2)}</Card.Title>
        <Card.Text className="text-style">Total Tips: ${totalTips.toFixed(2)}</Card.Text>
        <div>
          <h5>Payment Type Breakdown</h5>
          {Object.entries(paymentTypeCounts).map(([paymentType, count]) => (
            <div key={paymentType} className="payment-type-style">{paymentType}: {count}</div>
          ))}
        </div>

        <Card.Text className="date-range-style">
          <strong>Date Range:</strong> {firstDate} to {lastDate}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RevenueCard;
