import React, { useState, useEffect } from 'react';
import RevenueCard from '../../components/revenue/RevenueCard';
import { getRevenues } from '../../utils/data/revenueData';

function RevenuePage() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTips, setTotalTips] = useState(0);
  const [paymentTypeCounts, setPaymentTypeCounts] = useState({});
  const [firstDate, setFirstDate] = useState('');
  const [lastDate, setLastDate] = useState('');

  useEffect(() => {
    getRevenues()
      .then((data) => {
        const revenues = Array.isArray(data) ? data : [];
        if (revenues.length > 0) {
          const sortedRevenues = revenues.sort((a, b) => new Date(a.date) - new Date(b.date));
          setFirstDate(sortedRevenues[0].date);
          setLastDate(sortedRevenues[sortedRevenues.length - 1].date);
        }

        const totalRev = revenues.reduce((acc, revenue) => {
          const orderAmount = parseFloat(revenue.order_amount || 0);
          const tipAmount = parseFloat(revenue.tip_amount || 0);
          return acc + orderAmount + tipAmount;
        }, 0);

        const totalTip = revenues.reduce((acc, revenue) => {
          const tipAmount = parseFloat(revenue.tip_amount || 0);
          return acc + tipAmount;
        }, 0);

        setTotalRevenue(totalRev);
        setTotalTips(totalTip);

        const paymentCounts = revenues.reduce((acc, revenue) => {
          const paymentType = revenue.payment_type;
          acc[paymentType] = (acc[paymentType] || 0) + 1;
          return acc;
        }, {});

        setPaymentTypeCounts(paymentCounts);
      })
      .catch((error) => {
        console.error('Error fetching revenue data:', error);
      });
  }, []);

  return (
    <div>
      <RevenueCard
        totalRevenue={totalRevenue}
        totalTips={totalTips}
        paymentTypeCounts={paymentTypeCounts}
        firstDate={firstDate}
        lastDate={lastDate}
      />
    </div>
  );
}

export default RevenuePage;
