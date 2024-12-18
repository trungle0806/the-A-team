import React, { useState } from "react";
import "./CartForm.css"; // Đảm bảo đường dẫn đúng với file CSS của bạn

const CartForm = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 100, quantity: 1 },
    { id: 2, name: "Product 2", price: 150, quantity: 2 },
    { id: 3, name: "Product 3", price: 200, quantity: 1 },
  ]);

  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price}</span>
              </div>
              <div className="item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <input
                  className="quantity-input"
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <div className="total">
          <span>Total: </span>
          <span>${calculateTotal()}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartForm;
