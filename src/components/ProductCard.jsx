import React, { useState } from "react";
import "../css/allProducts.css";
import{ Link } from 'react-router-dom';
import { useCart } from "../components/CartContext";
import CartTab from "../components/CartTab";

export default function ProductCard({ product }) {
  const [cartVisible, setCartVisible] = useState(false);
  const { addToCart } = useCart(); // Destructure addToCart

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };
  
  const handleAddToCart = () => {
    addToCart(product);
    toggleCart();
  };

  return (
    <>
      <div className="col-lg-4 col-6 productContainer mt-3">
        <div className=" productCard text-center" >
        <Link to={`/productDetail/${product.id}`}>
        <img src={product.image} alt={product.name} height="60%" width="100%"/>
        </Link>
          <h4 className="mt-1">{product.name}</h4>
          <p>Rs. {product.price}</p>
          <button className="btn btn-outline-dark rounded-0 w-75" onClick={handleAddToCart} >
            Add to Cart
          </button>
        </div>
      </div>
      <CartTab cartVisible={cartVisible} toggleCart={toggleCart}  />
    </>
  );
}
