import React from 'react';

function OrderItemList({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.product_id}>{item.quantity} {item.product_name} @ ${item.unit_price}AUD each</li>)}
    </ul>
  );
}

function OrderTableRow({ order }) {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.created_at}</td>
      <td><OrderItemList items={order.order_items} /></td>
      <td>${order.shipping_price}AUD</td>
      <td>${order.total_price}AUD</td>
    </tr>
  );
}

/**
 *
 * @orders
 *  - id:number
 *  - shipping_price
 *  - total_price
 *  - created_at
 *  - order items
 *    - product id
 *    - quantity
 *    - product_name
 *    - Unit Price
 */
export default function OrderTable({ orders }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Time</th>
          <th>Items</th>
          <th>Shipping</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => <OrderTableRow key={order.id} order={order} />)}
      </tbody>
    </table>
  );
}