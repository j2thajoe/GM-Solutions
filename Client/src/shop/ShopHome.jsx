import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useProductFilter } from "../../contexts/ProductFilterContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCards from "./ProductCards";
import "../assets/css/productcards.css";
import "../assets/css/shophome.css";
import { normalizeCategory } from "../utilis/normalizeCategory";

import electronicsimage from "../assets/images/category/categoryimages/electronics.png";
import computerandaccessoriesimage from "../assets/images/category/categoryimages/computers&accessories.png";
import networkingimage from "../assets/images/category/categoryimages/networking.png";
import phoneandaccessoriesimage from "../assets/images/category/categoryimages/phonesandaccessories.png";
import electricalsandpowersolutionsimage from "../assets/images/category/categoryimages/electricals.png";
import ewasteimage from "../assets/images/category/categoryimages/phonesandaccessories.png";
import smarthomeandsecurityimage from "../assets/images/category/categoryimages/phonesandaccessories.png";
import officeandstationerysuppliesimage from "../assets/images/category/categoryimages/phonesandaccessories.png";
import lifestyleandfashionimage from "../assets/images/category/categoryimages/phonesandaccessories.png";
import homeandkitchenappliancesimage from "../assets/images/category/categoryimages/homeandkitchenappliances.png";
import toolsandhardwareimage from "../assets/images/category/categoryimages/phonesandaccessories.png";
import medicalandhealthequipmentimage from "../assets/images/category/categoryimages/medicalandhealthequipment.png";

const ShopHome = () => {
  const navigate = useNavigate();
  const { updateFilter } = useProductFilter();

  const handleCategoryClick = (categoryName) => {
    const normalizedCategory = normalizeCategory(categoryName);
    updateFilter("selectedCategory", normalizedCategory);
    navigate("/shop");
  };

  const categoryList = [
    {
      name: "Electronics",
      image: electronicsimage,
    },
    {
      name: "Phone & Accessories",
      image: phoneandaccessoriesimage,
    },
    {
      name: "Computer & Accessories",
      image: computerandaccessoriesimage,
    },
    {
      name: "Electricals & Power Solutions",
      image: electricalsandpowersolutionsimage,
    },
    {
      name: "Networking",
      image: networkingimage,
    },
    {
      name: "E-Waste",
      image: ewasteimage,
    },
    {
      name: "Smart Home and Security",
      image: smarthomeandsecurityimage,
    },
    {
      name: "Office & Stationery",
      image: officeandstationerysuppliesimage,
    },
    {
      name: "Lifestyle & Fashion",
      image: lifestyleandfashionimage,
    },
    {
      name: "Home & Kitchen Appliances",
      image: homeandkitchenappliancesimage,
    },
    {
      name: "Tools & Hardware",
      image: toolsandhardwareimage,
    },
    {
      name: "Medical and Health Equipment",
      image: medicalandhealthequipmentimage,
    },
  ];

  return (
    <div className="p-4">
      <BackButton />

      <div className="product-category-grid">
        <div className="category-grid">
          {categoryList.map(({ name, image }) => (
            <section key={name} onClick={() => handleCategoryClick(name)}>
              <div className="categoryitself">
                <img
                  className="categoryimage"
                  src={image}
                  alt={`${name} Icon`}
                />
                <br></br>
                <h1 className="categoryname">{name}</h1>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopHome;
