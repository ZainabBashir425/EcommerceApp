import React, { useState} from "react";
import "../css/productDetail.css";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import CartTab from "../components/CartTab";
import { allProducts } from "../data";

export default function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the route parameters
  const { addToCart} = useCart();
  const [cartVisible, setCartVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = allProducts
    .flatMap((category) => category.products) // Flatten the products array
    .find((product) => product.id === parseInt(id));
  if (!product) {
    return <div>Loading...</div>;
  }

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toggleCart();
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + delta, 1)); // Ensure quantity is at least 1
  };
  // const handleQuantityChange = (id, delta) => {
  //   updateQuantity(id, delta);
  // };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-5 col-8">
            <img
              src={product.image}
              alt={product.name}
              className="productDImg"
            />
          </div>
          <div className="col-lg-5 product-info">
            <h1 className="mb-2 mt-3">{product.name}</h1>
            <p className="mb-1 lh-1">{product.description}</p>
            <p className="m-0">Rs.{product.price}</p>
            <div className="product-quantity mb-3">
              <span className="dminus" onClick={() => handleQuantityChange(-1)}>
                &#8722;
              </span>
              <span className="quantity">{quantity}</span>
              <span className="dplus" onClick={() => handleQuantityChange(1)}>
                &#43;
              </span>
            </div>
            <button
              className="btn btn-outline-dark rounded-0 w-50"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <CartTab cartVisible={cartVisible} toggleCart={toggleCart} />
    </>
  );
}
