import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/productcategoryslider.css";
import "../../assets/css/servicecategoryslider.css";

const ServiceCategorySlider = ({ images = [] }) => {
  const [serviceCategories, setServiceCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = () => {
      let storedImages = images.length
        ? images
        : JSON.parse(localStorage.getItem("shopServiceCategory")) || [];

      storedImages = storedImages.filter(
        (item) => item && item?.src && item?.title
      );

      setServiceCategories(storedImages);
    };
    fetchImages();
    window.addEventListener("storage", fetchImages);
    return () => window.removeEventListener("storage", fetchImages);
  }, [images]);

  useEffect(() => {
    if (serviceCategories.length <= 5) return;
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [serviceCategories, startIndex]);

  const handleClick = (category) => {
    console.log("Navigating to:", category.link);
    if (category.link) {
      const path = category.link.startsWith("/")
        ? category.link
        : `/${category.link}`;
      navigate(path, { replace: false });
    } else {
      console.warn(`No link found for ${category.title}`);
    }
  };

  const handlePrev = () => {
    if (serviceCategories.length <= 5) return;
    setIsAnimating(true);
    setTimeout(() => {
      setStartIndex(
        (prev) =>
          (prev - 1 + serviceCategories.length) % serviceCategories.length
      );
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (serviceCategories.length <= 5) return;
    setIsAnimating(true);
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % serviceCategories.length);
      setIsAnimating(false);
    }, 300);
  };

  // Get 5 items, wrapping around when needed
  const visibleCategories = [];

  for (let i = 0; i < 5 && serviceCategories.length > 0; i++) {
    const index = (startIndex + i) % serviceCategories.length;
    visibleCategories.push(serviceCategories[index]);
  }

  return (
    <div className="slider-container">
      <div className="slider-content">
        {visibleCategories.length === 5 && (
          <>
            <div className="slider-arrow left-arrow" onClick={handlePrev}>
              ‹
            </div>
            <div className="slider-images">
              {visibleCategories.map((category, index) => (
                <div
                  key={index}
                  className={`slider-image-container image-pos-${index}`}
                  onClick={() => handleClick(category)}
                >
                  <img
                    src={category.src}
                    alt={category.alt || category.title}
                    className="slider-image"
                  />
                  <div className="slider-overlay">
                    <span className="slider-title">{category.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="slider-arrow right-arrow" onClick={handleNext}>
              ›
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceCategorySlider;
