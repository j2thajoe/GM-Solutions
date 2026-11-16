import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/productcategoryslider.css";

const ProductCategorySlider = ({ images = [] }) => {
  const [productCategories, setProductCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = () => {
      let storedImages = images.length
        ? images
        : JSON.parse(localStorage.getItem("shopProductCategory")) || [];

      storedImages = storedImages.filter
        (item => item && item?.src && item?.title
      );

      setProductCategories(storedImages);
    };
    fetchImages();
    window.addEventListener("storage", fetchImages);
    return () => window.removeEventListener("storage", fetchImages);
  }, [images]);

  
  useEffect(() => {
    if (productCategories.length <= 5) return;
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [productCategories, startIndex]);

  const handleClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  const handlePrev = () => {
    if (productCategories.length <= 5) return;
    setIsAnimating(true);
    setTimeout(() => {
      setStartIndex(
        (prev) => (prev - 1 + productCategories.length) % productCategories.length
      );
      setIsAnimating(false);
    }, 300); // match transition time
  };

  const handleNext = () => {
    if (productCategories.length <= 5) return;
    setIsAnimating(true);
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % productCategories.length);
      setIsAnimating(false);
    }, 300);
  };


  // Get 5 items, wrapping around when needed
  const visibleCategories = [];

  for (let i = 0; i < 5 && productCategories.length > 0; i++) {
    const index = (startIndex + i) % productCategories.length;
    visibleCategories.push(productCategories[index]);
  }

  return (
    <div className="slider-container">
      <div className="slider-content">
        {visibleCategories.length === 5 && (
          <>
            <div className="slider-arrow left-arrow" onClick={handlePrev}>‹</div>
            <div className="slider-images">
              {visibleCategories.map((category, index) => (
                <div
                  key={index}
                  className={`slider-image-container image-pos-${index}`}
                  onClick={() => handleClick(category.title)}
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
            <div className="slider-arrow right-arrow" onClick={handleNext}>›</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCategorySlider;
