import React, { useState } from 'react';
import './Inventory.css';
import './InventoryResponsive.css'

function Inventory() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', stock: 50, category: 'Electronics', updated: '2024-11-18' },
    { id: 2, name: 'Chair', stock: 120, category: 'Furniture', updated: '2024-11-17' },
    { id: 3, name: 'Notebook', stock: 200, category: 'Stationery', updated: '2024-11-16' },
  ]);

  return (
    <div className="inventory-container">
      {/* Header */}
      <header className="inventory-header">
        <h1>Inventory Management</h1>
        <p>Manage and monitor product stock levels.</p>
      </header>

      {/* Product List */}
      <section className="inventory-list">
        <h3>Product Inventory</h3>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Stock Quantity</th>
              <th>Category</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Inventory;
