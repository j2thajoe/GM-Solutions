import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/productcategoryslider.css";
import "../../assets/css/artcategoryslider.css";

const ArtCategorySlider = ({ images = [] }) => {
  const [artCategories, setArtCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = () => {
      let storedImages = images.length
        ? images
        : JSON.parse(localStorage.getItem("artCategory")) || [];

      storedImages = storedImages.filter(
        (item) => item && item?.src && item?.title
      );

      setArtCategories(storedImages.slice(0, 3));
    };
    fetchImages();
    window.addEventListener("storage", fetchImages);
    return () => window.removeEventListener("storage", fetchImages);
  }, [images]);

    useEffect(() => {
    if (artCategories.length <= 3) return;
    const interval = setInterval(() => handleNext(), 10000);
    return () => clearInterval(interval);
  }, [artCategories, startIndex]);


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
    if (artCategories.length <= 1) return;
    setIsAnimating(true);
    setTimeout(() => {
      setStartIndex(
        (prev) => (prev - 1 + artCategories.length) % artCategories.length
      );
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (artCategories.length <= 1) return;
    setIsAnimating(true);
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % artCategories.length);
      setIsAnimating(false);
    }, 300);
  };

   // ✅ Only 3 visible images (1 left, 1 center, 1 right)
  const visibleCategories = [];
  for (let i = 0; i < 3 && artCategories.length > 0; i++) {
    const index = (startIndex + i) % artCategories.length;
    visibleCategories.push(artCategories[index]);
  }

  

  return (
    <div className="slider-container">
      <div className="slider-content">
        {visibleCategories.length === 3 && (
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

export default ArtCategorySlider;
