import React from "react";
import "../css/cart.css";
import { useCart } from "../components/CartContext";

export default function CartTab({ cartVisible, toggleCart }) {
  const { cartItems, updateQuantity} = useCart();
  const handleQuantityChange = (id, delta) => {
    updateQuantity(id, delta);
  };
  return (
    <div class={`cartTab ${cartVisible ? "show" : ""}`}>
      <h1>Shopping Cart</h1>
      <div className="listCart">
        {cartItems.map(item => (
          <div key={item.id} className="item">
            <div className="image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="name">{item.name}</div>
            <div className="price">Rs.{item.price}</div>
            <div className="quantity">
              <span className="minus" onClick={() => handleQuantityChange(item.id, -1)}>&#8722;</span>
              <span>{item.quantity}</span>
              <span className="plus" onClick={() => handleQuantityChange(item.id, 1)}>&#43;</span>
            </div>
          </div>
        ))}
      </div>
      <div class="btns">
        <button class="close" onClick={toggleCart}>
          CLOSE
        </button>
        <button class="checkOut">Check Out</button>
      </div>
    </div>
  );
}
