import React from 'react';
import "../css/cart.css";
import { useCart } from "../components/CartContext";

export default function CartTable() {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Destructure removeFromCart

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };
  const handleQuantityChange = (id, delta) => {
    updateQuantity(id, delta);
  };


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td className="productImg">
                <img src={item.image} alt={item.name} height="150rem" width="150rem"/>
                <div className="allDetails">
                  <span className="details">
                    <h4>{item.name}</h4>
                    <i className="fa-solid fa-trash-can delete" onClick={() => handleRemove(item.id)}></i>
                  </span>
                </div>
              </td>
              <td className="price">Rs. {item.price}</td>
              <td className="quantities">
                <span className="minus" onClick={() => handleQuantityChange(item.id, -1)}>&#8722;</span>
                <span className="quantity">{item.quantity}</span>
                <span className="plus" onClick={() => handleQuantityChange(item.id, 1)}>&#43;</span>
              </td>
              <td className="totalPrice">Rs. {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
