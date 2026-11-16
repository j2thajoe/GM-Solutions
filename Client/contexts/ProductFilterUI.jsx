import React, { useEffect } from "react";
import { useProductFilter } from "./ProductFilterContext";
import "../src/assets/css/productfilterUI.css";

const categories = [
  "All",
  "electronics",
  "phonesandaccessories",
  "computersandaccessories",
  "electricalsandpowersolutions",
  "networking",
  "eWaste",
  "smarthomeandsecurity",
  "officeandstationerysupplies",
  "lifestyleandfashion",
  "homeandkitchenappliances",
  "toolsandhardware",
  "medicalandhealthequipment",
];

const categoryNameMap = {
  phonesandaccessories: "Phones & Accessories",
  computersandaccessories: "Computer & Accessories",
  electricalsandpowersolutions: "Electricals & Power Solutions",
  networking: "Networking",
  ewaste: "E-Waste",
  smarthomeandsecurity: "Smart Home & Security",
  officeandstationerysupplies: "Office & Stationery",
  lifestyleandfashion: "Lifestyle & Fashion",
  homeandkitchenappliances: "Home & Kitchen Appliances",
  toolsandhardware: "Tools & Hardware",
  medicalandhealthequipment: "Medical & Health Equipment",
  electronics: "Electronics",
  all: "All",
};

const priceRanges = [
  { label: "All", value: null },
  { label: "Under Ksh500", value: [0, 500] },
  { label: "Ksh500 - Ksh2500", value: [500, 2500] },
  { label: "Ksh2500 - Ksh7500", value: [2500, 7500] },
  { label: "Over Ksh7500", value: [7500, Infinity] },
];

const sortOptions = [
  { label: "Default", value: null },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

const formatCategory = (cat) => categoryNameMap[cat.toLowerCase()] || cat;

const ProductFilterUI = ({ availableCategories }) => {
  const { filters, setFilters } = useProductFilter();

  const normalizedCategories = [
    { slug: "All", displayName: "All" },
    ...availableCategories
      .filter((c) => {
        if (typeof c === "string") return c.toLowerCase() !== "all";
        if (typeof c === "object") return c.slug.toLowerCase() !== "all";
        return false;
      })
      .map((c) =>
        typeof c === "string"
          ? {
              slug: c,
              displayName: formatCategory(c),
            }
          : c
      ),
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    // Initialize defaults on mount
    setFilters((prev) => ({
      selectedCategory: prev.selectedCategory || null,
      priceRange: prev.priceRange || null,
      sortBy: prev.sortBy || null,
    }));
  }, [setFilters]);

  return (
    <div className="product-filter-container">
      <div className="filter-sections">
        <div className="filter-section">
          <label className="filter-label">Category</label>
          <select
            className="filter-select"
            value={filters.selectedCategory || "All"}
            onChange={(e) =>
              handleFilterChange(
                "selectedCategory",
                e.target.value === "All" ? null : e.target.value
              )
            }
          >
            {normalizedCategories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <label className="filter-label">Price Range</label>
          <select
            className="filter-select"
            value={
              priceRanges.find(
                (r) =>
                  JSON.stringify(r.value) === JSON.stringify(filters.priceRange)
              )?.label || "All"
            }
            onChange={(e) => {
              const selected = priceRanges.find(
                (r) => r.label === e.target.value
              );
              handleFilterChange("priceRange", selected?.value || null);
            }}
          >
            {priceRanges.map((range) => (
              <option key={range.label}>{range.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <label className="filter-label">Sort By</label>
          <select
            className="filter-select"
            value={
              sortOptions.find((opt) => opt.value === filters.sortBy)?.label ||
              "Default"
            }
            onChange={(e) => {
              const selected = sortOptions.find(
                (opt) => opt.label === e.target.value
              );
              handleFilterChange("sortBy", selected?.value || null);
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterUI;
