import React, { useState } from "react";
import productData from "../products.json";
import serviceData from "../services.json";
import { Link } from "react-router-dom";
import SelectedCategory from "../components/SelectedCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import "../index.css";
import "swiper/css";
import "../assets/css/banner.css";

//bootstrap css
import "../assets/css/bootstrap.min.css";
import "../assets/js/bootstrap.min.js/";

const backgroundImages = [
  "/images/photoedits/homepage1.jpeg",
  "/images/photoedits/homepage2.jpg",
  "/images/photoedits/homepage3.jpg",
  "/images/photoedits/homepage4.jpg",
  "/images/photoedits/homepage5.jpg",
  "/images/photoedits/homepage6.jpg",
  "/images/photoedits/homepage7.jpg",
  "/images/photoedits/homepage8.jpg",
  "/images/photoedits/homepage9.jpg",
  "/images/photoedits/homepage10.jpg",
  "/images/photoedits/homepage11.jpg",
];

const heroTitle = <h1>GMNEX BUSINESS SOLUTIONS</h1>;

const heroSubtitle = (
  <h2>
    Where <span>QUALITY</span> meets <span>AFFORDABILITY</span>
  </h2>
);

const serviceTitle = (
  <h3>
    Search for a <span>Product</span> or <span>Service</span>
  </h3>
);
const serviceDesc =
  "We've got a large collection of products and multiple services for provision";

const bannerlist = [
  {
    iconName: "icofont-notification",
    text: "More than 200 Products",
  },
  {
    iconName: "icofont-globe",
    text: "Buy Anything Online",
  },
];

const Banner = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [filteredServices, setFilteredServices] = useState(serviceData);
  console.log(productData);
  console.log(serviceData);

  /* search functionality */
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);

    /* filtering product based on search */
    const filteredProduct = productData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProduct);

    /* filtering service based on search */
    const filteredService = serviceData.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filteredService);
  };

  return (
    <div className="banner-section style-4">
      <div className="hero-background">
        {/* Dynamically rendered background images */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`background-image background-image-${index}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <div className="container">
        {/* Hero Section with Animated Background */}
        <div className="banner-content  text-center">
          <div className="hero-text">
            {heroTitle}
            <br></br>
            {heroSubtitle}
            {/* search category */}

            <div className="banner-content">
              {serviceTitle}
              <form className="search-form">
                <SelectedCategory select={"all"} />
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search your Product or Service"
                    value={searchInput}
                    onChange={handleSearch}
                  />
                  <i className="icofont-ui-search" />
                </div>
              </form>

              <ul className="lab-ul">
                {searchInput &&
                  filteredProducts.map((product, i) => (
                    <li key={i}>
                      <Link to={"/shop/${product.id}"}>{product.name}</Link>
                    </li>
                  ))}

                {searchInput &&
                  filteredServices.map((service, i) => (
                    <li key={i}>
                      <Link to={"/shop/${service.id}"}>{service.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
