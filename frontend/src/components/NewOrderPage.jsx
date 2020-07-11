import React, { useState, useEffect } from 'react';
import OrderForm from './orders/OrderForm';
import CompletedOrder from './orders/CompletedOrder';

export default function NewOrderPage({ apiClient }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (loading) {
      apiClient.getAvailableProducts()
        .then(products => {
          setProducts(products);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  });

  async function fetchPrices(orderItems) {
    try {
      return await apiClient.getOrderPrices(orderItems);
    } catch (err) {
      setError(err.message);
    }
  }

  async function submitOrder(orderItems) {
    try {
      const result = await apiClient.createOrder(orderItems);
      setOrderDetails(result);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (orderDetails) {
    return <CompletedOrder {...orderDetails} />;
  }

  return <OrderForm
    products={products}
    fetchPrices={fetchPrices}
    submitOrder={submitOrder}
  />;
}