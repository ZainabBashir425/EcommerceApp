import React, { useState, useEffect } from "react";
import CategoryTop from "../components/CategoryTop";
import ProductCard from "../components/ProductCard";
import { allProducts } from "../data";
import "../css/category.css";
import { sortProducts, calculateMinMaxPrice, filterByPriceRange,filterBySubcategories } from "../utils/filtersAndSorts";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Fragrance() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Featured");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Default max price
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [productsCount, setProductsCount] = useState(0);

  document.title = "Fashion Aura | Fragrances";

  const fragranceCategory = allProducts.find(
    (category) => category.category === "Fragrance"
  );

  useEffect(() => {
    if (fragranceCategory && fragranceCategory.products.length > 0) {
      const { min, max } = calculateMinMaxPrice(fragranceCategory.products);
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    }
  }, [fragranceCategory]);

  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };
  const [isPOpen, setIsPOpen] = useState(false); // To handle the filter item collapse/expand
  const toggleProductFilterContent = () => {
    setIsPOpen(!isPOpen);
  };
  const [isCOpen, setIsCOpen] = useState(false); // To handle the filter item collapse/expand
  const toggleCostFilterContent = () => {
    setIsCOpen(!isCOpen);
  };
  
  const handleSubcategoryChange = (e) => {
    const { id, checked } = e.target;
    setSelectedSubcategories((prevSelected) =>
      checked
        ? [...prevSelected, id]
        : prevSelected.filter((subcategory) => subcategory !== id)
    );
  };

  useEffect(() => {
    if (fragranceCategory && fragranceCategory.products.length > 0) {
      const sortedProducts = sortProducts(
        fragranceCategory.products,
        selectedSortOption
      );
      const filteredByPrice = filterByPriceRange(
        sortedProducts,
        priceRange[0],
        priceRange[1]
      );
      const filteredBySubcategories = filterBySubcategories(
        filteredByPrice,
        selectedSubcategories
      );
      setFilteredProducts(filteredBySubcategories);
      setProductsCount(filteredBySubcategories.length);
    }
  }, [fragranceCategory, priceRange, selectedSortOption, selectedSubcategories]);

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };
  return (
    <>
      <CategoryTop
        category="Fragrances"
        showFilters={showFilters}
        toggleFilters={toggleFilters}
        selectedSortOption={selectedSortOption} // Pass sorting option
        setSelectedSortOption={setSelectedSortOption}
        productsCount={productsCount}
      />
      <div className="container">
        <div className="row">
          {showFilters && (
            <div
              className={`filter-section ${showFilters ? "show" : ""} col-3`}
            >
              <div className="filter-item">
                <h4 onClick={toggleProductFilterContent}>
                  Product type{" "}
                  <span>
                    <i
                      className={`fa-solid ${
                        isPOpen ? "fa-angle-up" : "fa-angle-down"
                      }`}
                    ></i>
                  </span>
                </h4>
                {isPOpen && (
                  <div className="filter-content">
                    <ul className="checkbox-group">
                    {fragranceCategory.subcategories.map((subcategory) => (
                        <li key={subcategory}>
                          <input
                            type="checkbox"
                            id={subcategory}
                            onChange={handleSubcategoryChange}
                          />
                          <label htmlFor={subcategory}>{subcategory}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="filter-item">
                <h4 onClick={toggleCostFilterContent}>
                  Price{" "}
                  <span>
                    <i
                      className={`fa-solid ${
                        isCOpen ? "fa-angle-up" : "fa-angle-down"
                      }`}
                    ></i>
                  </span>
                </h4>
                {isCOpen && (
                  <div className="filter-content">
                    <div className="price-info">
                      <div className="price-range">
                        <input
                          type="number"
                          name="min"
                          value={priceRange[0]}
                          min={minPrice}
                          max={maxPrice}
                          readOnly
                        />
                        <span className="currency-symbol">Rs. </span>
                      </div>
                      <span>to</span>
                      <div className="price-range">
                        <input
                          type="number"
                          name="max"
                          value={priceRange[1]}
                          min={minPrice}
                          max={maxPrice}
                          readOnly
                        />
                        <span className="currency-symbol">Rs. </span>
                      </div>
                    </div>
                    <div className="price-slider">
                    <Slider
                        range
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                      />
                    </div>
                    <div className="price-info">
                     The highest price is Rs. {maxPrice}
                    </div>
                  </div>
                )}
              </div>
              <button
                className="brn btn-outline-dark close-btn w-50"
                onClick={toggleFilters}
              >
                Close
              </button>
            </div>
          )}
          <div className={showFilters ? "col-9" : "col-12"}>
            <div className="row">
            {filteredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
