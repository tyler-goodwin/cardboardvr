import React from 'react';

function KeyValue({ label, children }) {
  return (
    <div>
      <strong>{label}</strong>: {children}
    </div>
  )
}

export default function CompletedOrder({ message, order }) {
  return (
    <div>
      <h2>{message}</h2>
      <KeyValue label="Order No">{order.id}</KeyValue>
      <KeyValue label="Time">{order.created_at}</KeyValue>
      <KeyValue label="Items">
        <ul>
          {
            order.order_items.map(i => (
              <li key={i.product_id}>{i.quantity}x {i.product_name} @ ${i.unit_price}AUD</li>
            ))
          }
        </ul>
      </KeyValue>
      <KeyValue label="Shipping Price">${order.shipping_price}AUD</KeyValue>
      <KeyValue label="Total Price">${order.total_price}AUD</KeyValue>
    </div>
  )
}