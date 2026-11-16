import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/productcategoryslider.css";
import "../../assets/css/coursecategoryslider.css";

const CourseCategorySlider = ({ images = [] }) => {
  const [courseCategories, setCourseCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();


    useEffect(() => {
    if (images && images.length > 0) setCourseCategories(images);
  }, [images]);

// Auto-slide every 10s
  useEffect(() => {
    if (courseCategories.length <= 5) return;
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [courseCategories, startIndex]);

  const handleClick = (course) => {
    // Option 1: Navigate to internal page
    navigate(`/courses?video=${encodeURIComponent(course.youtubeUrl)}`);

    // Option 2: Open YouTube directly
    // window.open(course.youtubeUrl, "_blank");
  };


  const handlePrev = () => {
    if (courseCategories.length <= 5) return;
    setIsAnimating(true);
    setTimeout(() => {
      setStartIndex(
        (prev) => (prev - 1 + courseCategories.length) % courseCategories.length
      );
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (courseCategories.length <= 5) return;
    setIsAnimating(true);
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % courseCategories.length);
      setIsAnimating(false);
    }, 300);
  };

  // Get 5 visible items
  const visibleCategories = [];
  for (let i = 0; i < 5 && courseCategories.length > 0; i++) {
    const index = (startIndex + i) % courseCategories.length;
    visibleCategories.push(courseCategories[index]);
  }

  return (
    <div className="slider-container course-slider">
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
            <div className="slider-arrow right-arrow" onClick={handleNext}>
              ›
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseCategorySlider;
