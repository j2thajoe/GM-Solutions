import React, { useState, useEffect } from "react";
import "/src/assets/css/services.css";
import Data from "../../services.json";
import PosterDesignlogo from "/images/photoedits/thisisjustthestart.jpg";
import PhotoDesignlogo from "/images/photoedits/thisisjustthestart.jpg";
import PhotoEditinglogo from "/images/photoedits/colorainbow.jpg";
import WebsiteDesignlogo from "/images/photoedits/thisisjustthestart.jpg";
import { Link } from "react-router-dom";

const GraphicDesigns = () => {
  const [gridList, setGridList] = useState(true);
  const [services, setServices] = useState(Data);

  return (
    <div className="services-content">
      <div className="poster-design-wrapper d-flex flex-column">
        <Link to="/PosterDesign">
          <div className="poster-design-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h2 className="">Poster Design</h2>
              <p className="brief-service-detailing">
                Our poster design services bring your ideas to life with
                eye-catching visuals and creative layouts. Whether for business
                promotions, events, or campaigns, we design posters that
                effectively communicate your message and attract attention with
                stunning graphics and typography.
              </p>
            </div>
            <img
              className="services-image"
              src={PosterDesignlogo}
              alt="posterdesigning_logo"
            />
          </div>
        </Link>
      </div>
      <div className="photo-design-wrapper d-flex flex-column">
        <Link to="/PhotoDesign">
          <div className="photo-design-textbox d-flex justify-content-center align-items-center">
            <img
              className="services-image"
              src={PhotoDesignlogo}
              alt="photodesigning_logo"
            />
            <div className="content-right">
              <h2 className="">Photo Design</h2>
              <p className="brief-service-detailing">
                We specialize in photo design, creating unique and customized
                visuals for personal or business use. Whether it’s for social
                media, marketing, or special occasions, we craft aesthetically
                appealing and professionally enhanced images that leave a
                lasting impression.
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="photo-editing-wrapper d-flex flex-column">
        <Link to="/PhotoEditing">
          <div className="photo-editing-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h2 className="">Photo Editing</h2>
              <p className="brief-service-detailing">
                Our photo editing services enhance, retouch, and transform your
                images to perfection. From color correction and background
                removal to advanced manipulations, we ensure your photos look
                stunning, professional, and polished for any purpose.
              </p>
            </div>
            <img
              className="services-image"
              src={PhotoEditinglogo}
              alt="photoediting_logo"
            />
          </div>
        </Link>
      </div>
        <div className="website-design-wrapper d-flex flex-column">
        <Link to="/WebsiteDesign">
          <div className="website-design-textbox d-flex justify-content-center align-items-center">
            <img
              className="services-image"
              src={WebsiteDesignlogo}
              alt="websitedesigning_logo"
            />
            <div className="content-right">
              <h2 className="">Website Designs</h2>
              <p className="brief-service-detailing">
                We specialize in photo design, creating unique and customized
                visuals for personal or business use. Whether it’s for social
                media, marketing, or special occasions, we craft aesthetically
                appealing and professionally enhanced images that leave a
                lasting impression.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GraphicDesigns;