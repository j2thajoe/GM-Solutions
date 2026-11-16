import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/ecitizenservices.css";
import "../../../index.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import KRAlogo from "../../../../public/images/KRA_logo.jpg";
import ITAXlogo from "../../../../public/images/ITAX_logo.png";

//background images
import KRABackImage1 from "../../../../public/images/background/KRA/KRABackImage1.jpg";
import KRABackImage2 from "../../../../public/images/background/KRA/KRABackImage2.jpg";
import KRABackImage3 from "../../../../public/images/background/KRA/KRABackImage3.jpg";
import KRABackImage4 from "../../../../public/images/background/KRA/KRABackImage4.jpg";
import KRABackImage5 from "../../../../public/images/background/KRA/KRABackImage5.jpg";

//bootstrap css
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/js/bootstrap.min.js/";

//fonts and icons
import "../../../assets/css/icofont.min.css";
import "../../../assets/css/animate.css";
import "../../../assets/css/style.min.css";
import { MdSubtitles } from "react-icons/md";

const KRA = () => {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(0);

  const serviceIntroduction = "Hey there, fellow CITIZEN";
  const KRAtitle =
    "Here is what we can do for you through our country's TAX Department";

  const backgroundImages = [
    KRABackImage1,
    KRABackImage2,
    KRABackImage3,
    KRABackImage4,
    KRABackImage5,
  ];

  const IconList = [
    {
      image: KRAlogo,
    },
    /*
    {
      image: ITAXlogo,
    },
    */
  ];

  const Title = [
    {
      serviceTitle: serviceIntroduction,
    },
  ];
  const SubTitle = [
    {
      serviceSubtitle: KRAtitle,
    },
  ];

  const KRAservicesList = [
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
        className="KRA-startup style-4 padding-tb section-bg-ash"
        style={backgroundStyle}
      >
        <div className="container">
          {/*KRA component projection*/}

          <div className="section-wrapper">
            <div className="g-2 justify-content-center align-items-center ">
              {/*IconList*/}
              <div className="col">
                {IconList.map((val, i) => (
                  <div key={i} className="count-item text-center">
                    <div className="count-inner">
                      <div className="count-image">
                        <img
                          className="KRA-logo"
                          src={val.image}
                          alt="KRA logo"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/*Services HEAD*/}

              <div className="total-text-content">
                <div className="instructor-content text-center">
                  {Title.map((val, i) => (
                    <div key={i} className="count-item text-center">
                      <div className="count-inner">
                        <div className="count-text">
                          <h1 className="service-title">{val.serviceTitle}</h1>
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

                <br />
                {/*services LIST*/}

                <Link to="/services">
                  <div className="instructor-content text-center">
                    {KRAservicesList.map((val, i) => (
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

export default KRA;
