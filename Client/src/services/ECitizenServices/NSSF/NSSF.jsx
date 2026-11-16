import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/ecitizenservices.css";
import "swiper/css";
import "../../../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import NSSFlogo from "../../../../public/images/NSSF_logo.jpeg";

//background images
import NSSFBackImage1 from "../../../../public/images/background/NSSF/NSSFBackImage1.jpg";
import NSSFBackImage2 from "../../../../public/images/background/NSSF/NSSFBackImage2.jpg";
import NSSFBackImage3 from "../../../../public/images/background/NSSF/NSSFBackImage3.jpg";
import NSSFBackImage4 from "../../../../public/images/background/NSSF/NSSFBackImage4.jpg";
import NSSFBackImage5 from "../../../../public/images/background/NSSF/NSSFBackImage5.jpg";

//bootstrap css
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/js/bootstrap.min.js";
import "../../../assets/css/style.min.css";
import { MdSubtitles } from "react-icons/md";

//fonts and icons
import "../../../assets/css/icofont.min.css";
import "../../../assets/css/animate.css";
import "../../../assets/css/style.min.css";

const NSSF = () => {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(0);

  const serviceIntroduction = "Seeking some MEDICAL accompanance";
  const NSSFDetail =
    "A state corporation established in 1964 through an Act of Parliament Corp 258 of the Laws of Kenya which is a friendly organisation existing for public good majorly offering Social Security Protection to all workers in Kenya";
  const NSSFtitle =
    "What we can do for you through the country's main SOCIAL SECURITY site, NSSF.";

  const backgroundImages = [
    NSSFBackImage1,
    NSSFBackImage2,
    NSSFBackImage3,
    NSSFBackImage4,
    NSSFBackImage5,
  ];

  const IconList = [
    {
      image: NSSFlogo,
    },
  ];

  const Detail = [
    {
      serviceDetail: NSSFDetail,
    },
  ];

  const Title = [
    {
      serviceTitle: serviceIntroduction,
    },
  ];

  const SubTitle = [
    {
      serviceSubtitle: NSSFtitle,
    },
  ];

  const NSSFservicesList = [
    {
      service: "Registration",
    },
    {
      service: "HABA HABA",
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
        className="NSSF-startup style-4 padding-tb section-bg-ash"
        style={backgroundStyle}
      >
        <div className="container">
          {/*NSSF component projection*/}

          <div className="section-wrapper">
            <div className="g-2 justify-content-center align-items-center ">
              {/*IconList*/}
              <div className="col">
                {IconList.map((val, i) => (
                  <div key={i} className="count-item text-center">
                    <div className="count-inner">
                      <div className="count-image">
                        <img
                          className="NSSF-logo"
                          src={val.image}
                          alt="NSSF logo"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <br />

              {/*service Detail*/}

              <div className="total-text-content">
                <div className="instructor-content text-center">
                  {Detail.map((val, i) => (
                    <div key={i} className="count-item text-center">
                      <div className="count-inner">
                        <div className="count-text">
                          <h3 className="service-detail">
                            {val.serviceDetail}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/*Services TITLE*/}

                <div className="KUCCPS-content">
                  <div className="instructor-content text-center">
                    {Title.map((val, i) => (
                      <div key={i} className="count-item text-center">
                        <div className="count-inner">
                          <div className="count-text">
                            <h2 className="service-title">
                              {val.serviceTitle}
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

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

                  {/*services LIST*/}

                  <Link to="/services">
                    <div className="instructor-content text-center">
                      {NSSFservicesList.map((val, i) => (
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

export default NSSF;
