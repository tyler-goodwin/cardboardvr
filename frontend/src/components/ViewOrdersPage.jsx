import React, { useState, useEffect } from 'react';
import OrderTable from './orders/OrderTable';

export default function ViewOrdersPage({ apiClient }) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      apiClient.getOrders()
        .then(orders => {
          setOrders(orders);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <OrderTable orders={orders} />;
}