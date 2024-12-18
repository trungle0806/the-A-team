import React, { useState } from 'react';
import './Product.css';

function Product() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800 },
    { id: 3, name: 'Chair', category: 'Furniture', price: 200 },
  ]);

  const [form, setForm] = useState({ id: '', name: '', category: '', price: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddProduct = () => {
    if (form.name && form.category && form.price) {
      setProducts([...products, { ...form, id: products.length + 1 }]);
      setForm({ id: '', name: '', category: '', price: '' });
    }
  };

  return (
    <div className="product-container">
      <header className="product-header">
        <h1>Manage Products</h1>
        <p>Add, edit, or delete products from the inventory.</p>
      </header>

      {/* Danh sách sản phẩm */}
      <section className="product-list">
        <h3>Product List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Form thêm/sửa sản phẩm */}
      <section className="product-form">
        <h3>Add Product</h3>
        <form>
          <div className="form-up">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>
          <div className="form-up">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleInputChange}
              placeholder="Enter category"
            />
          </div>
          <div className="form-up">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </div>
          <button className="product-px" type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </section>
    </div>
  );
}

export default Product;
