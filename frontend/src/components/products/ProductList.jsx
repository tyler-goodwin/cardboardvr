import React from 'react';
import './ProductList.css';

export default function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id} className="ProductList_Product">
          <div className="ProductList_Name">{product.name}</div>
          <div className="ProductList_Price">${product.unit_price} AUD</div>
        </div>
      ))}
    </div>
  )
}
