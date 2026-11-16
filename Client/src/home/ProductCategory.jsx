import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCategorySlider from "../home/sliders/ProductCategorySlider";
import shopProductCategoryData from "../assets/data/shopProductCategory.json";
import "../assets/css/category.css";

const subTitle = "Buy Anything and Whatever you choose with GM SOLUTIONS";
const title = " PRODUCT SHOPPING";
const btnText = "Shop NOW";

const ProductCategory = () => {
  const [productCategory, setProductCategory] = useState([]);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("shopProductCategory"));
    if (!existing || existing === "[]") {
      localStorage.setItem(
        "shopProductCategory",
        JSON.stringify(shopProductCategoryData)
      );
    }
    const storedProductCategoryImages =
      JSON.parse(localStorage.getItem("shopProductCategory")) || [];
    setProductCategory(storedProductCategoryImages);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedImages =
        JSON.parse(localStorage.getItem("shopProductCategory")) || [];
      setProductCategory(updatedImages);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="category-section style-4 padding-tb">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">{subTitle}</span>
          <h1 className="title">{title}</h1>
        </div>
        
          <div>
            <ProductCategorySlider images={productCategory} />
          </div>
        
        <br />
        <div className="button-holder">
          <Link to="/shop" className="lab-btn">
            <span>{btnText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
