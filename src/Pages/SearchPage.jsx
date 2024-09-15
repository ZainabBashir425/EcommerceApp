import React from "react";
import { useLocation } from "react-router-dom";
import { allProducts } from "../data";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("term")?.toLowerCase();
  const category = queryParams.get("category")?.toLowerCase();

  const normalizeCategory = (categoryName) => {
    return categoryName.toLowerCase().replace(/\s+/g, "");
  };

  const matchWholeWord = (text, term) => {
    const regex = new RegExp(`\\b${term}\\b`, "i"); // \b ensures whole word match
    return regex.test(text);
  };

  // Filter products based on search term and category
  const filteredProducts = allProducts
    .filter((section) => {
      const normalizedCategory = normalizeCategory(section.category); // Normalize category from data
      if (category !== "all" && category !== normalizedCategory) {
        return section.category.toLowerCase() === category;
      }
      return true;
    })
    .flatMap((section) => section.products)
    .filter((product) =>{
      const normalizedSubCategory = normalizeCategory(product.subCategory.toLowerCase());
      const normalizedProductName = product.name.toLowerCase();
      // Check if the search term matches either the product name (whole word) or subcategory
      return (
        matchWholeWord(normalizedProductName, searchTerm) ||
        normalizedSubCategory.includes(searchTerm)
      );
    });

  return (
    <div className="container">
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h1 className="text-center m-4">Nothing Found</h1>
        )}
      </div>
    </div>
  );
}
