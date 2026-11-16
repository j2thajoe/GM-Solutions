import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/category.css";

const headerSubTitle =
  "We offer an incredible variety of services, solutions also follow!";
const headerTitle = "Services  & Solutions";
const subTitle = "Get access to our services";
const title = "Services & Solutions Offered";
const desc =
  "Most of our services are offered online; to be served, just click on the service button to gain access to a service provider";
const btnText = "Get SERVED";

const countFirstList = [
  {
    iconName: "icofont-notification",
    text: "Print, Bind & Laminate",
    link: "/PrintingBinding",
  },
  {
    iconName: "icofont-notification",
    text: "Poster Design",
    link: "/PosterDesign",
  },
  {
    iconName: "icofont-notification",
    text: "Photo Editing",
    link: "/PhotoEditing",
  },
  {
    iconName: "icofont-notification",
    text: "Photo Design",
    link: "/PhotoDesign",
  },
  {
    iconName: "icofont-notification",
    text: "Website Design",
    link: "/WebsiteDesign",
  },
];

const countSecondList = [
  {
    iconName: "icofont-notification",
    text: "NTSA",
    link: "/NTSA",
  },
  {
    iconName: "icofont-notification",
    text: "NSSF",
    link: "/NSSF",
  },
  {
    iconName: "icofont-notification",
    text: "SHIF",
    link: "/SHIF",
  },
  {
    iconName: "icofont-notification",
    text: "KUCCPS",
    link: "/KUCCPS",
  },
  {
    iconName: "icofont-notification",
    text: "KRA",
    link: "/KRA",
  },
  {
    iconName: "icofont-notification",
    text: "HELB",
    link: "/HEF",
  },
];

const countThirdList = [
  {
    iconName: "icofont-notification",
    text: "Computer & Laptop Solutions",
    link: "/ComputerandLaptopSolutions",
  },
  {
    iconName: "icofont-notification",
    text: "Mobile Solutions",
    link: "/MobileSolutions",
  },
  {
    iconName: "icofont-notification",
    text: "Network & Security Solutions",
    link: "/NetworkandSecuritySolutions",
  },
  {
    iconName: "icofont-notification",
    text: "Home & Office Solutions",
    link: "/HomeandOfficeSolutions",
  },
  {
    iconName: "icofont-notification",
    text: "Educational & Training Solutions",
    link: "/EducationalandTrainingSolutions",
  },
  {
    iconName: "icofont-notification",
    text: "Retail & Product Sourcing",
    link: "/RetailandProductSourcing",
  },
];

const ServiceCategory2 = () => {
  return (
    <div>
      <div className="instructor-section style-4 padding-tb section-bg-ash">
        <div className="container">
          {/* section header */}

          <div className="section-header ">
            <span className="subtitle">{headerSubTitle}</span>
            <h2 className="title">{headerTitle}</h2>
          </div>

          {/* section sevice card */}
          <div className="section-wrapper">
            <div className="row  justify-content-center align-items-center ">
              <div className="col">
                {countFirstList.map((val, i) => (
                  <div key={i} className="count-item text-center">
                    <Link to={val.link}>
                      <div className="count-inner">
                        <div className="count-icon">
                          <i className={val.iconName}></i>
                        </div>
                        <div className="count-content ">
                          <p className="fs-4 fw-semibold">{val.text}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="col">
                {countSecondList.map((val, i) => (
                  <div key={i} className="count-item text-center">
                    <Link to={val.link}>
                      <div className="count-inner">
                        <div className="count-icon">
                          <i className={val.iconName}></i>
                        </div>
                        <div className="count-content">
                          <p className="fs-4 fw-semibold">{val.text}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="col">
                {countThirdList.map((val, i) => (
                  <div key={i} className="count-item text-center">
                    <Link to={val.link}>
                      <div className="count-inner">
                        <div className="count-icon">
                          <i className={val.iconName}></i>
                        </div>
                        <div className="count-content">
                          <p className="fs-4 fw-semibold">{val.text}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <div className="col">
              <div className="instructor-content text-center">
                <h2 className="title">{title}</h2>
                <p>{desc}</p>
                <Link to="/services" className="lab-btn">
                  {btnText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory2;
