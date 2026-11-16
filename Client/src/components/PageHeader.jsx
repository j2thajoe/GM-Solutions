import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundData from "../backgroundData.json";
import "../assets/css/pageheader.css";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useProductFilter } from "../../contexts/ProductFilterContext";
import Search from "../shop/Search";

import ProductFilterUI from "../../contexts/ProductFilterUI";

const showResults = "Showing 18 of 200 Products";

const PageHeader = ({
  title,
  subTitle,
  curPage,
  isShopPage,
  products,
  gridList,
}) => {
  const currentPageData = backgroundData[curPage] || {};
  const backgroundImage1 = currentPageData.image1;
  const backgroundImage2 = currentPageData.image2;
  const backgroundImage3 = currentPageData.image3;
  const backgroundImage4 = currentPageData.image4;
  const backgroundImage5 = currentPageData.image5;
  const backgroundVideo = currentPageData.video;
  const backgroundAudio = currentPageData.audio;
  const backgroundEmbed = currentPageData.embed;


  const renderBackgroundMedia = () => {
    if (backgroundImage1) {
      return (
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${backgroundImage1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      );
    }
    if (backgroundImage2) {
      return (
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${backgroundImage2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      );
    }
    if (backgroundImage3) {
      return (
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${backgroundImage3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      );
    }
    if (backgroundImage4) {
      return (
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${backgroundImage4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      );
    }
    if (backgroundImage5) {
      return (
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${backgroundImage5})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      );
    }
    if (backgroundVideo) {
      return (
        <div className="background-video">
          <video autoPlay loop muted>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      );
    }
    if (backgroundAudio) {
      return (
        <div className="background-audio">
          <audio autoPlay loop>
            <source src={backgroundAudio} type="audio/mp3" />
          </audio>
        </div>
      );
    }
    if (backgroundEmbed) {
      return (
        <div className="background-embed">
          <iframe
            title="Embedded Media"
            src={backgroundEmbed}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pageheader-section">
      {renderBackgroundMedia()}

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="pageheader-content text-center">
              <h2 className="mb-4">{title}</h2>
              <h4>{subTitle}</h4>
              <br />
            </div>
          </div>

          {/* only reender on Shop Page */}

          {isShopPage && (
            <div>
              <ProductFilterUI />
              <Search products={products} gridList={gridList} />
              <div className="show-results">
                <p>{showResults}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
