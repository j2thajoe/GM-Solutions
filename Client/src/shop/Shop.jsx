import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCards from "./ProductCards";
import "../assets/css/productcards.css";
import ProductFilterUI from "../../contexts/ProductFilterUI";
import { useProductFilter } from "../../contexts/ProductFilterContext";
import { normalizeCategory } from "../utilis/normalizeCategory";

const Shop = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const { filters, setFilters } = useProductFilter();
  const [categories, setCategories] = useState(["All"]);

  const params = new URLSearchParams(location.search);
  const categoryParam = params.get("category");

  useEffect(() => {
    if (categoryParam) {
      const normalized = normalizeCategory(categoryParam);
      setFilters((prev) => ({ ...prev, selectedCategory: normalized }));
    }
  }, [categoryParam, setFilters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              price: Number(data.price) || 0,
              category: normalizeCategory(data.category || "Uncategorized"),
              timestamp: data.timestamp || { seconds: 0 },
            };
          })
          .filter((item) => item.name && item.price >= 0);

        console.log("Fetched products:", items);
        setProducts(items);

        const uniqueCategories = [
          "All",
          ...Array.from(new Set(items.map((item) => item.category))),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const matchesCategory = (product) => {
    const selected = filters.selectedCategory?.toLowerCase();

    return (
      !selected ||
      selected === "all" ||
      normalizeCategory(product.category) === selected
    );
  };

  const matchesPrice = (product) => {
    if (!filters.priceRange || !Array.isArray(filters.priceRange)) return true;
    const [min, max] = filters.priceRange;
    return product.price >= min && product.price <= max;
  };

  const filteredProducts = products
    .filter((product) => matchesCategory(product) && matchesPrice(product))
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return b.timestamp?.seconds - a.timestamp?.seconds || 0;
        default:
          return 0;
      }
    });

  return (
    <div className="p-4">
      <BackButton />

      {/*<h1 className="text-3xl font-bold mb-4">Shop</h1>*/}
      <div className="filter-ui">
        <ProductFilterUI availableCategories={categories} />
      </div>
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products match your filters.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
