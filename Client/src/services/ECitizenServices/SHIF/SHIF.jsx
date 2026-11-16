import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/ecitizenservices.css";
import "../../../index.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SHIFlogo from "../../../../public/images/SHIF_logo.jpg";

//background images
import SHIFBackImage1 from "../../../../public/images/background/SHIF/SHIFBackImage1.jpg";
import SHIFBackImage2 from "../../../../public/images/background/SHIF/SHIFBackImage2.jpg";
import SHIFBackImage3 from "../../../../public/images/background/SHIF/SHIFBackImage3.jpg";
import SHIFBackImage4 from "../../../../public/images/background/SHIF/SHIFBackImage4.jpg";
import SHIFBackImage5 from "../../../../public/images/background/SHIF/SHIFBackImage5.jpg";

//bootstrap css
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/js/bootstrap.min.js";

//fonts and icons
import "../../../assets/css/icofont.min.css";
import "../../../assets/css/animate.css";
import "../../../assets/css/style.min.css";
import { MdSubtitles } from "react-icons/md";

const SHIF = () => {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(0);

  const serviceIntroduction = "Seeking some MEDICAL accompanance??";
  const SHIFtitle =
    "Here are the services we can do for you to  successfully connect you through the nation's main HEALTH parastal.";

  const backgroundImages = [
    SHIFBackImage1,
    SHIFBackImage2,
    SHIFBackImage3,
    SHIFBackImage4,
    SHIFBackImage5,
  ];

  const IconList = [
    {
      image: SHIFlogo,
    },
  ];

  const Title = [
    {
      serviceTitle: serviceIntroduction,
    },
  ];
  const SubTitle = [
    {
      serviceSubtitle: SHIFtitle,
    },
  ];

  const SHIFservicesList = [
    {
      service: "SignUP to SHA",
    },
    {
      service: "PIN returns",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 180000); // Change image every 3 minutes (180,000 milliseconds)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [backgroundImages.length]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImages[currentBackground]})`,
    backgroundSize: "cover",
    backgroundPosition: "left",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    position: "relative",
  };

  return (
    <div>
      <div
        className="SHIF-startup style-4 padding-tb section-bg-ash"
        style={backgroundStyle}
      >
        <div className="container">
          {/*SHIF component projection*/}

          <div className="section-wrapper">
            <div className="g-2 justify-content-center align-items-center">
              {/*IconList*/}
              <div className="col">
                {IconList.map((val, i) => (
                  <div key={i} className="count-item text-center">
                    <div className="count-inner">
                      <div className="count-image">
                        <img
                          className="SHIF-logo"
                          src={val.image}
                          alt="SHIF logo"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <br />
              <br />

              {/*Services HEAD*/}

              <div className="total-text-content">
                <div className="instructor-content text-center">
                  {Title.map((val, i) => (
                    <div key={i} className="count-item text-center">
                      <div className="count-inner">
                        <div className="count-text">
                          <h2 className="service-title">{val.serviceTitle}</h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <br />
                <br />

                {/*Services SubTitle*/}

                <div className="col">
                  <div className="instructor-content text-center">
                    {SubTitle.map((val, i) => (
                      <div key={i} className="count-item text-center">
                        <div className="count-inner">
                          <div className="count-text">
                            <h2 className="service-subtitle">
                              {val.serviceSubtitle}
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <br />
                  <br />

                  {/*services LIST*/}

                  <Link to="/services">
                    <div className="instructor-content text-center">
                      {SHIFservicesList.map((val, i) => (
                        <div key={i} className="count-item text-center">
                          <div className="count-inner">
                            <div className="count-text">
                              <h3 className="service">{val.service}</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SHIF;
