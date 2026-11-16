import React, { createContext, useContext, useState } from "react";

const ProductFilterContext = createContext();

export const ProductFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    selectedCategory: null,
    priceRange: null,
    sortBy: null,
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ProductFilterContext.Provider value={{ filters, setFilters, updateFilter }}>
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilter = () => {
  const context = useContext(ProductFilterContext);

  if (!context) {
    throw new Error(
      "useProductFilter must be used within a ProductFilterProvider"
    );
  }
  return context;
};
