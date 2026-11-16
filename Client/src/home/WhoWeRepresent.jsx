import React, { useEffect, useRef } from "react";
import "../assets/css/whowerepresent.css";

import KRAimage from "../assets/images/representees/KRA_logo-removebg-preview.png";
import NHIFimage from "../assets/images/representees/NHIF2-removebg-preview.png";
import NSSFimage from "../assets/images/representees/NSSF2-removebg-preview.png";
import NTSAimage from "../assets/images/representees/NTSA_logo-removebg-preview.png";
import KUCCPSimage from "../assets/images/representees/KUCCPS_logo-removebg-preview.png";

const subTitle =
  "Those Government Departments whose services we can Assist you with.";

const representeesList = [
  {
    name: "KRA",
    image: KRAimage,
  },
  {
    name: "NHIF",
    image: NHIFimage,
  },
  {
    name: "NSSF",
    image: NSSFimage,
  },
  {
    name: "NTSA",
    image: NTSAimage,
  },
  {
    name: "KUCCPS",
    image: KUCCPSimage,
  },
];

const WhoWeRepresent = () => {
  const sliderRef = useRef(null);

  const slideImages = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const totalWidth = slider.scrollWidth;
      const containerWidth = slider.offsetWidth;

      if (slider.scrollLeft + containerWidth >= totalWidth) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += 1;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(slideImages, 40000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="representee-section section-bg">
      <div className="container">
        <div className="section-wrapper">
          {/* section header */}
          <div className="section-header text-center">
            <span className="subtitle">{subTitle}</span>
          </div>
          {/* government services logo */}
          <div className="representee-slider">
            <div className="representee-list" ref={sliderRef}>
              {representeesList.map((val, i) => (
                <div className="representee-item" key={i}>
                  <div className="representee-thumb">
                    <img src={val.image} alt={`Representee logo ${i}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeRepresent;
