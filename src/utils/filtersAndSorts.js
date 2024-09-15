export const calculateMinMaxPrice = (products) => {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return { min: 0, max: 0 };  // Return default values if products is invalid or empty
  }

  const prices = products.map(product => parseInt(product.price, 10) || 0);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

export const filterByPriceRange = (products, minPrice, maxPrice) => {
  return products.filter(product => {
    const price = parseInt(product.price, 10) || 0;
    return price >= minPrice && price <= maxPrice;
  });
};
export const filterBySubcategories = (products, selectedSubcategories) => {
  if (selectedSubcategories.length === 0) return products;
  return products.filter(product => selectedSubcategories.includes(product.subCategory));
};
  
  // Function to sort products based on selected sort option
  export function sortProducts(products, sortOption) {
    switch (sortOption) {
      case "Alphabetically, A-Z":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "Alphabetically, Z-A":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case "Price, low to high":
        return [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "Price, high to low":
        return [...products].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      default:
        return products;
    }
  }