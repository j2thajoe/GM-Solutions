import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ServiceCategorySlider from "../home/sliders/ServiceCategorySlider";
import shopServiceCategoryData from "../assets/data/shopServiceCategory.json";
import "../assets/css/category.css";

const headerSubTitle =
  "We offer an incredible variety of services, solutions also follow!";
const subTitle = "Get access to our services";
const title = "SERVICES & SOLUTIONS";
const btnText = "GET SERVED";

const ServiceCategory = () => {
  const [serviceCategory, setServiceCategory] = useState([]);

  useEffect(() => {
    const healData = () => {
      const existing = JSON.parse(localStorage.getItem("shopServiceCategory"));

      const isInvalid =
        !Array.isArray(existing) ||
        existing.length === 0 ||
        existing.some(
          (item, i) =>
            !item?.link ||
            !item?.src ||
            !item?.title ||
            item.link.startsWith("/services/") ||
            item.link.trim() === "" ||
            item.title.trim().toLowerCase() !==
              shopServiceCategoryData[i]?.title?.trim().toLowerCase()
        );

      if (isInvalid) {
        console.warn("⚙️ Healing shopServiceCategory localStorage...");
        localStorage.setItem(
          "shopServiceCategory",
          JSON.stringify(shopServiceCategoryData)
        );
        setServiceCategory(shopServiceCategoryData);
      } else {
        setServiceCategory(existing);
      }
    };
    healData();
    window.addEventListener("storage", healData);
    return () => window.removeEventListener("storage", healData);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedImages =
        JSON.parse(localStorage.getItem("shopServiceCategory")) || [];
      setServiceCategory(updatedImages);
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
          <ServiceCategorySlider images={serviceCategory} />
        </div>

        <br />
        <div className="button-holder">
          <Link to="/services" className="lab-btn">
            <span>{btnText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;
