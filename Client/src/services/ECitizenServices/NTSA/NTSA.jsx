import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/ecitizenservices.css";
import "../../../index.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import NTSAlogo from "../../../../public/images/NTSA_logo.png";

//background images
import NTSABackImage1 from "../../../../public/images/background/NTSA/NTSABackImage1.jpg";
import NTSABackImage2 from "../../../../public/images/background/NTSA/NTSABackImage2.jpg";
import NTSABackImage3 from "../../../../public/images/background/NTSA/NTSABackImage3.jpg";
import NTSABackImage4 from "../../../../public/images/background/NTSA/NTSABackImage4.jpg";
import NTSABackImage5 from "../../../../public/images/background/NTSA/NTSABackImage5.jpg";

//bootstrap css
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/js/bootstrap.min.js/";

//fonts and icons
import "../../../assets/css/icofont.min.css";
import "../../../assets/css/animate.css";
import "../../../assets/css/style.min.css";
import { MdSubtitles } from "react-icons/md";

const NTSA = () => {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(0);

  const serviceIntroduction = "Seeking some MEDICAL accompanance??";
  const NTSAtitle =
    "Here are the services we can do for you through the nation's main HEALTH parastal.";

  const backgroundImages = [
    NTSABackImage1,
    NTSABackImage2,
    NTSABackImage3,
    NTSABackImage4,
    NTSABackImage5,
  ];

  const IconList = [
    {
      image: NTSAlogo,
    },
  ];

  const Title = [
    {
      serviceTitle: serviceIntroduction,
    },
  ];
  const SubTitle = [
    {
      serviceSubtitle: NTSAtitle,
    },
  ];

  const NTSAservicesList = [
    {
      service: "SignUP to NTSA",
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
        className="NTSA-startup style-4 padding-tb section-bg-ash"
        style={backgroundStyle}
      >
        <div className="container">
          {/*NTSA component projection*/}
          <div className="section-wrapper">
            <div className=" g-2justify-content-center align-items-center">
              {/*IconList*/}
              <div className="col">
                {IconList.map((val, i) => (
                  <div key={i} className="count-item text-center">
                    <div className="count-inner">
                      <div className="count-image">
                        <img
                          className="NTSA-logo"
                          src={val.image}
                          alt="NTSA logo"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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

                <br />
                <br />

                {/*services LIST*/}

                <Link to="/services">
                  <div className="instructor-content text-center">
                    {NTSAservicesList.map((val, i) => (
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
  );
};

export default NTSA;
