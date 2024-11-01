import React from 'react';
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

function Payment() {
    const { cartItems,clearCart, clearCartInFirebase } = useCart();
    const navigate = useNavigate();
    const completeOrder =async ()=>{
        await clearCartInFirebase(cartItems);
    clearCart();
    navigate("/");
        alert("Payment has been recieved and order has been placed.")
      }
  return (
    <div className='container '>
        <div className="row mt-5 justify-content-center">
            <div className="col-12 col-md-6">
                <h3 className='mb-4 text-center'>Pay with Bank Account</h3>
                <h4>Bank</h4>
                <select id="bank" className="w-100 p-2 my-1">
                   <option value="hbl">HBL</option>
                   <option value="askari">Askari Bank</option>
                   <option value="ubl">UBL</option>
                </select>
                <h4>Account No.</h4>
                <input type="text" placeholder='Account Number' className="w-100 p-2 my-1"/>
                <button className="btn btn-dark w-100 mt-3" onClick={completeOrder}>Pay</button>
            </div>
        </div>
      
    </div>
  )
}

export default Payment
