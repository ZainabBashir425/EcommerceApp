import React from "react";
import "../css/cart.css";
import CartTable from "../components/CartTable";
import { useCart } from "../components/CartContext";
import {useNavigate} from 'react-router-dom';

export default function Cart() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const checkoutPage =()=>{
    navigate("/checkout")
}
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className="container my-3">
      <h1 className="text-center">Shopping Cart</h1>
      <div className="row">
        <div className="col-12">
        {cartItems.length > 0 ? <CartTable /> : <h4>Your cart is empty.</h4>}
        </div>
        <div className="subtotal col-12 text-end">
          <h2>
            Subtotal: <span className="amount">Rs. {subtotal}</span>
          </h2>
          <div>
            <button className="btn CheckBtn btn-outline-dark rounded-0 w-25" onClick={checkoutPage} disabled={cartItems.length === 0}>
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
