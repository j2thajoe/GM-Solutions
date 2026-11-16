import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/ecitizenservices.css";
import "../../../index.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ECitizenlogo from "../../../../public/images/eCitizen1.png";
import ECitizenlogo2 from "../../../../public/images/eCitizen1.jpeg";

//background images
import ECitizenBackImage1 from "../../../../public/images/background/ECitizen/ECitizenBackImage1.jpg";
import ECitizenBackImage2 from "../../../../public/images/background/ECitizen/ECitizenBackImage2.jpg";
import ECitizenBackImage3 from "../../../../public/images/background/ECitizen/ECitizenBackImage3.jpg";
import ECitizenBackImage4 from "../../../../public/images/background/ECitizen/ECitizenBackImage4.jpg";
import ECitizenBackImage5 from "../../../../public/images/background/ECitizen/ECitizenBackImage5.jpg";

//bootstrap css
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/js/bootstrap.min.js/";


//fonts and icons
import "../../../assets/css/icofont.min.css";
import "../../../assets/css/animate.css";
import "../../../assets/css/style.min.css";
import { MdSubtitles } from "react-icons/md";

const ECitizen = () => {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(0);

  const serviceIntroduction = "Hey there, fellow CITIZEN";
  const ECitizentitle =
    "Here is what we can do for you through our country's TAX Department";

  const backgroundImages = [
    ECitizenBackImage1,
    ECitizenBackImage2,
    ECitizenBackImage3,
    ECitizenBackImage4,
    ECitizenBackImage5,
  ];

  const IconList = [
    {
      image: ECitizenlogo,
    },
    {
      image: ECitizenlogo2,
    },
  ];

  const Title = [
    {
      serviceTitle: serviceIntroduction,
    },
  ];
  const SubTitle = [
    {
      serviceSubtitle: ECitizentitle,
    },
  ];

  const ECitizenservicesList = [
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
        className="ECitizen-startup style-4 padding-tb section-bg-ash"
        style={backgroundStyle}
      >
        <div className="container">
          {/*ECitizen component projection*/}

          <div className="section-wrapper">
            <div className="g-2 justify-content-center align-items-center ">
              {/*IconList*/}
              <div className="col">
                {IconList.map((val, i) => (
                  <div key={i} className="count-item text-center">
                    <div className="count-inner">
                      <div className="count-image">
                        <img
                          className="ECitizen-logo"
                          src={val.image}
                          alt="ECitizen logo"
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
                    {ECitizenservicesList.map((val, i) => (
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

export default ECitizen;
