import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArtCategorySlider from "../home/sliders/ArtCategorySlider";
import ArtCategoryData from "../assets/data/artCategory.json";
import "../assets/css/category.css";

const subTitle = "Experience our exclusive art collections";
const title = " ART CONTENT";
const btnText = "Experience NOW";

const ArtCategory = () => {
  const [artCategory, setArtCategory] = useState([]);

  useEffect(() => {
    const healData = () => {
      const existing = JSON.parse(localStorage.getItem("artCategory")) || [];

      const isInvalid =
        !Array.isArray(existing) ||
        existing.length === 0 ||
        existing.some(
          (item, i) =>
            !item?.link ||
            !item?.src ||
            !item?.title ||
            item.link.startsWith("/art/") ||
            item.link.trim() === "" ||
            item.title.trim().toLowerCase() !==
              ArtCategoryData[i]?.title?.trim().toLowerCase()
        );

      if (isInvalid) {
        console.warn("🎨 Healing artCategory localStorage...");
        localStorage.setItem("artCategory", JSON.stringify(ArtCategoryData));
        setArtCategory(ArtCategoryData);
      } else {
        setArtCategory(existing);
      }
    };

    healData();
    window.addEventListener("storage", healData);
    return () => window.removeEventListener("storage", healData);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedImages =
        JSON.parse(localStorage.getItem("artCategory")) || [];
      setArtCategory(updatedImages);
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
          <ArtCategorySlider images={artCategory} />
        </div>

        <br />
        <div className="button-holder">
          <Link to="/artgallery" className="lab-btn">
            <span>{btnText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtCategory;
