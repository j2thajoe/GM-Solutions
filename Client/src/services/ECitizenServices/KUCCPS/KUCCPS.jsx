import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/ecitizenservices.css";
import "../../../index.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import KUCCPSlogo from "../../../../public/images/KUCCPS_logo.png";

//background images
import KUCCPSBackImage1 from "../../../../public/images/background/KUCCPS/KUCCPSBackImage1.jpg";
import KUCCPSBackImage2 from "../../../../public/images/background/KUCCPS/KUCCPSBackImage2.jpg";
import KUCCPSBackImage3 from "../../../../public/images/background/KUCCPS/KUCCPSBackImage3.jpg";
import KUCCPSBackImage4 from "../../../../public/images/background/KUCCPS/KUCCPSBackImage4.jpg";
import KUCCPSBackImage5 from "../../../../public/images/background/KUCCPS/KUCCPSBackImage5.jpg";

//bootstrap css
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/js/bootstrap.min.js/";

//fonts and icons
import "../../../assets/css/icofont.min.css";
import "../../../assets/css/animate.css";
import "../../../assets/css/style.min.css";
import { MdSubtitles } from "react-icons/md";

const KUCCPS = () => {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(0);

  const serviceIntroduction = "Seeking some MEDICAL accompanance";
  const KUCCPStitle =
    "Here are the services we can do for you through the nation's first and main HEALTH parastal.";

  const backgroundImages = [
    KUCCPSBackImage1,
    KUCCPSBackImage2,
    KUCCPSBackImage3,
    KUCCPSBackImage4,
    KUCCPSBackImage5,
  ];

  const IconList = [
    {
      image: KUCCPSlogo,
    },
  ];

  const Title = [
    {
      serviceTitle: serviceIntroduction,
    },
  ];
  const SubTitle = [
    {
      serviceSubtitle: KUCCPStitle,
    },
  ];

  const KUCCPSservicesList = [
    {
      service: "Apply for a PIN",
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
        className="KUCCPS-startup style-4 padding-tb section-bg-ash"
        style={backgroundStyle}
      >
        <div className="container">
          {/*KUCCPS component projection*/}

          <div className="section-wrapper">
            <div className="g-2 justify-content-center align-items-center">
              {/*IconList*/}
              <div className="col">
                {IconList.map((val, i) => (
                  <div key={i} className="count-item text-center">
                    <div className="count-inner">
                      <div className="count-image">
                        <img
                          className="KUCCPS-logo"
                          src={val.image}
                          alt="KUCCPS logo"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <br />

              {/*Services TITLE*/}

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

                {/*service SubTITLE*/}

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
              </div>

              <br />

              {/*services LIST*/}

              <Link to="/services">
                <div className="instructor-content text-center">
                  {KUCCPSservicesList.map((val, i) => (
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
  );
};

export default KUCCPS;
