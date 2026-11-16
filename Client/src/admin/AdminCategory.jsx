import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";

//CSS
import "../index.css";
import "swiper/css";
import "../assets/css/admincategory.css";

//bootstrap css
import "../assets/css/bootstrap.min.css";
import "../assets/js/bootstrap.min.js/";

const AdminImages = [
  "../../images/photoedits/stationaries1.jpeg",
  "../../images/photoedits/stationaries2.jpeg",
  "../../images/photoedits/stationaries3.jpeg",
];

const AdminCategory = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % AdminImages.length);
    }, 15000); // 15seconds (15000ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="administrator-category-section style-4">
      <BackButton />
      <Link className="administrator-button" to="administrator">
        <br></br>
        <div>
          <img
            className="administrator-image"
            src={AdminImages[currentImageIndex]}
            alt="Administrator Category Images"
          />
          <br></br>
          <h1 className="admin-category-text-h1">Administrative Content</h1>
          <br></br>
        </div>
      </Link>
      <br></br>
    </div>
  );
};

export default AdminCategory;
