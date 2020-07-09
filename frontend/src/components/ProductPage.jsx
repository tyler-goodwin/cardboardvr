import React, { useState, useEffect } from 'react';

function ProductList({ products }) {
  return (
    <div>
      {products.map(product => <div key={product.type}>{product.type}: ${product.cost}</div>)}
    </div>
  )
}

export default function ProductPage({ apiClient }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <ProductList products={products} />;
}