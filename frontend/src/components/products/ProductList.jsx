import React from 'react';

export default function ProductList({ products }) {
  return (
    <div>
      {products.map(product => <div key={product.type}>{product.type}: ${product.cost}</div>)}
    </div>
  )
}
