import React, {useState} from "react";
import "../css/header.css";
import {Link, useNavigate} from 'react-router-dom';
import logoImg from "../Images/logo1.jpg";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass , faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { totalQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (!searchTerm) {
      // Navigate to category page if there's no search term
      if (selectedCategory === "") {
        navigate("/"); // If "All" is selected, go to home page
      } else {
        navigate(`/${selectedCategory}`);
      }
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
        if (category === "") {
          navigate("/"); // If "All" is selected, go to home page
        } else {
          navigate(`/${category}`); // Go to selected category
        }
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      // Navigate to search page with category and search term if search input is not empty
      navigate(`/search?term=${searchTerm}&category=${category || "all"}`);
    }
  };
  return (
    <header>
      <nav>
        <div className="container-fluid">
          <div className="row ">
            <div className="logo col-2 align-self-start">
              <img src={logoImg} alt="logo_img" />
              <p>FashionAura</p>
            </div>
            <div className="nav-search col-lg-7 col-md-6 p-0">
              <select id="searchdrop" onChange={handleSelectChange}>
                <option value="">All</option>
                <option value="makeup">Makeup</option>
                <option value="skincare">Skin Care</option>
                <option value="haircare">Hair Care</option>
                <option value="personal">Personal Care</option>
                <option value="fragrance">Fragrances</option>
                <option value="accessories">Accessories</option>
              </select>
              <input
                type="text"
                placeholder="Search FashionAura"
                className="searchinput"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <button onClick={handleSearch} className="searchIcon outline-0 border-0">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            <div className="nav-cart col-2 justify-content-center">
              <Link to="/cart" className="cart-icon">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ fontSize: "30px", color: "#fff" }}
                />
                <span className="cart-quantity">{totalQuantity}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
