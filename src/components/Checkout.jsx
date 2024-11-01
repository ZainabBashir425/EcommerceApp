import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import "../css/cart.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Checkout() {
  const { cartItems, updateQuantity,clearCart, clearCartInFirebase } = useCart();
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Cash-On-Delivery");
  const handleQuantityChange = (id, delta) => {
    updateQuantity(id, delta);
  };
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleEmailChange = async (email) => {
    setUserDetails((prev) => ({ ...prev, email })); // Update email state only

    if (email) {
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserDetails(userSnap.data());
      } else {
        setUserDetails((prev) => ({
          ...prev,
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          postalCode: "",
          phone: "",
        }));
      }
    }
  };

  const completeOrder = async () => {
    const userRef = doc(db, "users", userDetails.email);
    await setDoc(userRef, userDetails);
    await clearCartInFirebase(cartItems);
    clearCart();
    navigate("/"); // Save full user details to Firebase

    if (paymentMethod === "Cash-On-Delivery") {
      alert("Order has been placed");
    } else {
      navigate("/payment");
    }
  };

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col-lg-6">
          <h3>Contact</h3>
          <input
            type="email"
            className="p-2 mb-2"
            value={userDetails.email}
            style={{ width: "98%" }}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <h3>Delivery</h3>
          <select id="country" className="p-2" style={{ width: "98%" }}>
            <option value="Pakistan">Pakistan</option>
          </select>
          <input
            type="text"
            placeholder="First Name"
            className="me-2 p-2 my-2"
            style={{ width: "48%" }}
            value={userDetails.firstName}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            className="ms-1 p-2 my-2"
            style={{ width: "48%" }}
            value={userDetails.lastName}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
          <input type="text" placeholder="Address" className="p-2 my-2" style={{ width: "98%" }} value={userDetails.address}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, address: e.target.value }))
            } />
          <input
            type="text"
            placeholder="City"
            className="p-2 my-2 me-2"
            style={{ width: "48%" }}
            value={userDetails.city}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, city: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="p-2 my-2 ms-1"
            style={{ width: "48%" }}
            value={userDetails.postalCode}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, postalCode: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Phone number"
            className="p-2 my-2"
            value={userDetails.phone}
            style={{ width: "98%" }}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
          <div className="p-2 mt-2 border border-dark rounded-top" style={{ width: "98%" }}>
            <input
              type="radio"
              id="cashOnDelivery"
              name="payment"
              value="Cash-On-Delivery"
              checked={paymentMethod === "Cash-On-Delivery"}
              onChange={() => setPaymentMethod("Cash-On-Delivery")}
            />
            <label htmlFor="cashOnDelivery" className="ps-2">
              Cash On Delivery
            </label>
          </div>
          <div className="p-2 border border-dark border-top-0 rounded-bottom" style={{ width: "98%" }}>
            <input
              type="radio"
              id="viaCard"
              name="payment"
              value="Via-Card"
              checked={paymentMethod === "Via-Card"}
              onChange={() => setPaymentMethod("Via-Card")}
            />
            <label htmlFor="viaCard" className="ps-2">
              Debit - Credit Card
            </label>
          </div>
          <button className="btn btn-dark mt-3" style={{ width: "98%" }} onClick={completeOrder}>
            {paymentMethod === "Cash-On-Delivery"
              ? "Complete Order"
              : "Pay Now"}
          </button>
        </div>
        <div className="col-lg-6 mt-5">
          <div className="listCart">
            {cartItems.map((item) => (
              <div key={item.id} className="item">
                <div className="image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="name">{item.name}</div>
                <div className="price">Rs.{item.price}</div>
                <div className="quantity">
                  <span
                    className="minus"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    &#8722;
                  </span>
                  <span>{item.quantity}</span>
                  <span
                    className="plus"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    &#43;
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between px-3">
            <h6>Subtotal:</h6>
            <h6>Rs. {subtotal}</h6>
          </div>
          <div className="d-flex justify-content-between px-3">
            <h6>Shipping:</h6>
            <h6>Rs. 199</h6>
          </div>
          <div className="d-flex justify-content-between p-3">
            <h4>Total:</h4>
            <h4>Rs. {subtotal + 199}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
