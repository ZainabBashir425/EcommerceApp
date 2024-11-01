import React, { useState } from "react";
import "../css/footer.css";
import fastImg from "../Images/fast.png";
import easyImg from "../Images/Easy_returns.png";
import highlyImg from "../Images/Highly-rated.png";
import custCareImg from "../Images/247_Customer_Care.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  faFacebook,
  faXTwitter,
  faFacebookMessenger,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subscribeBtnOptions = {
    pending: "Subscribing...",
    success: "Thanks for subscribing!",
  };

  function isValidEmail(email) {
    return email.trim() !== ""; // Add more validation if necessary
  }
  async function saveUserDetails(email) {
    const userRef = doc(db, "users", email); // Assuming "users" collection
    await setDoc(userRef, { email }); // Save email; add other fields if needed
  }

  const handleFormSubmit = async () => {
    setIsPending(true);
    await saveUserDetails(email); // Save user email
    setIsSuccess(true);
    setIsPending(false);
  };

  const onSubmit = () => {
    if (isValidEmail(email)) {
      handleFormSubmit();
    }
  };

  return (
    <div>
      <div className="footer-top container">
        <div className="row">
          <div className="column col-6 col-lg-3 mb-3">
            <img src={fastImg} alt="Fast shipping" />
            <h6>Fast shipping</h6>
          </div>
          <div className="column col-6 col-lg-3 mb-3">
            <img src={easyImg} alt="Easy returns" />
            <h6>Easy returns</h6>
          </div>
          <div className="column col-6 col-lg-3 mb-3">
            <img src={highlyImg} alt="Highly-rated" />
            <h6>Highly-rated</h6>
          </div>
          <div className="column col-6 col-lg-3 mb-3">
            <img src={custCareImg} alt="24/7 Customer Care" />
            <h6>24/7 Customer Care</h6>
          </div>
        </div>
      </div>

      <footer>
        <section className="subscribe container">
          <div className="row gx-0">
            <h4 className="col-lg-6 col-12">
              Subscribe for store updates and discounts
            </h4>
            <div className="email col-lg-6 col-12 m-auto" id="subscribe-form">
              {!isPending && !isSuccess && (
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="subscribe-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending || isSuccess}
                />
              )}
              <button
                type="button"
                className={`subscribe-btn ${
                  isPending ? "pending" : isSuccess ? "success" : ""
                }`}
                onClick={onSubmit}
                disabled={isPending || isSuccess}
              >
                {isPending
                  ? subscribeBtnOptions.pending
                  : isSuccess
                  ? subscribeBtnOptions.success
                  : "Subscribe"}
              </button>
            </div>
          </div>
        </section>

        <section className="footer-links container">
          <div className="row gx-0">
            <div className="col-lg-3 col-6 mb-4">
              <h4>FashionAura</h4>
              <p>
                The contact between those element
                create a highly modern look
              </p>
              <p>Follow Us</p>
              <div className="icons">
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faFacebook} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faXTwitter} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faFacebookMessenger} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faSquareInstagram} />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-6 mb-4">
              <h4>ON OUR SITE</h4>
              <ul>
                <li>
                  <a href="/">About</a>
                </li>
                <li>
                  <a href="/">Shipping</a>
                </li>
                <li>
                  <a href="/cart">Cart</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-6 mb-4">
              <h4>Online Shop</h4>
              <ul>
                <li>
                  <a href="/makeup">Makeup</a>
                </li>
                <li>
                  <a href="/accessories">Accessories</a>
                </li>
                <li>
                  <a href="/fragrance">Fragrances</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-6 mb-4">
              <h4>CONTACT</h4>
              <ul>
                <li>
                  <a href="/">FashionAura.com</a>
                </li>
                <li>
                  <a href="/">+9230 ******</a>
                </li>
                <li>
                  <a href="/">Lahore, Pakistan</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <p className="flex-all-center copy">Copyright &copy; FashionAura.com</p>
      </footer>
    </div>
  );
}
