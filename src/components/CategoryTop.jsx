import React, { useState } from "react";
import "../css/category.css";

export default function CategoryTop({ category, showFilters, toggleFilters, selectedSortOption, setSelectedSortOption ,productsCount}) {
  const [showSortOptions, setShowSortOptions] = useState(false); // Default selected sort option

  // Function to toggle sort options
  const toggleSortOptions = () => {
    setShowSortOptions((prevShowSortOptions) => !prevShowSortOptions);
  };

  // Function to handle change in sort option
  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
    setShowSortOptions(false); // Automatically hide sort options after selection
  };
  return (
    <div className="container mt-5">
      <h1>{category}</h1>
      <div className="filters row">
        <div className="left-filter col-4">
          <button
            className="btn btn-outline-dark rounded-0"
            onClick={toggleFilters}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              width="28px"
            >
              <path
                d="M3.90476 6.28571H12M20.0952 6.28571H18.1905"
                stroke="currentColor"
                stroke-width="1"
              ></path>
              <path
                d="M13.9048 6.28571C13.9048 5.23374 14.7575 4.38095 15.8095 4.38095C16.8615 4.38095 17.7143 5.23374 17.7143 6.28571C17.7143 7.33769 16.8615 8.19048 15.8095 8.19048C14.7575 8.19048 13.9048 7.33769 13.9048 6.28571Z"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3.90476 12H7.71429M20.0952 12H12.9524"
                stroke="currentColor"
                stroke-width="1"
              ></path>
              <path
                d="M7.2381 12C7.2381 10.948 8.09089 10.0952 9.14286 10.0952C10.1948 10.0952 11.0476 10.948 11.0476 12C11.0476 13.052 10.1948 13.9048 9.14286 13.9048C8.09089 13.9048 7.2381 13.052 7.2381 12Z"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3.90476 17.7143H9.61905M20.0952 17.7143C17.4917 17.7143 17.9369 17.7143 15.3333 17.7143"
                stroke="currentColor"
                stroke-width="1"
              ></path>
              <path
                d="M11.5238 17.7143C11.5238 16.6623 12.3766 15.8095 13.4286 15.8095C14.4806 15.8095 15.3333 16.6623 15.3333 17.7143C15.3333 18.7663 14.4806 19.619 13.4286 19.619C12.3766 19.619 11.5238 18.7663 11.5238 17.7143Z"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            {showFilters ? "Hide Filters" : "Filters"}
          </button>
          <p>{productsCount} Results</p>
        </div>
        <div className="right-filter col-8 justify-content-end">
          <button onClick={toggleSortOptions}>
            Sort: {selectedSortOption}{" "}
            <i
              className={`fa-solid fa-angle-${showSortOptions ? "up" : "down"}`}
            ></i>
          </button>
          {showSortOptions && (
            <div className="sort-container">
              <ul className="sort-options">
                <li>
                  <input
                    type="radio"
                    id="sort-featured"
                    name="sort"
                    value="Featured"
                    checked={selectedSortOption === "Featured"}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="sort-featured">Featured</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="sort-alphabetical-az"
                    name="sort"
                    value="Alphabetically, A-Z"
                    checked={selectedSortOption === "Alphabetically, A-Z"}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="sort-alphabetical-az">Alphabetically, A-Z</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="sort-alphabetical-za"
                    name="sort"
                    value="Alphabetically, Z-A"
                    checked={selectedSortOption === "Alphabetically, Z-A"}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="sort-alphabetical-za">Alphabetically, Z-A</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="sort-price-low-high"
                    name="sort"
                    value="Price, low to high"
                    checked={selectedSortOption === "Price, low to high"}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="sort-price-low-high">Price, low to high</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="sort-price-high-low"
                    name="sort"
                    value="Price, high to low"
                    checked={selectedSortOption === "Price, high to low"}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="sort-price-high-low">Price, high to low</label>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
