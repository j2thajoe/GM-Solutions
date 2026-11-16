import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/footer.css";

import FooterImageBackground from "../assets/images/footer/allblackkids.jpg";

const title = "About GM";
const desc =
  "More than a Shopping Site, More than a Sevice Provider, Survey more with us to get Served More";
const categoryTitle = "Categories";
const blogTitle = "Chats & Blog";

const addressList = [
  {
    iconName: "icofont-google-map ",
    text: "   Bomas, Dedan Kimathi University, ",
    text2: "Nyeri, KENYA.",
  },
  {
    iconName: "icofont-phone",
    text: "   0700000000",
  },
  {
    iconName: "icofont-envelope",
    text: "   gmbusinessservices@gmail.com",
  },
];

const socialList = [
  {
    iconName: "icofont-facebook",
    siteLink: "/",
    className: "facebook",
  },
  {
    iconName: "icofont-twitter",
    siteLink: "/",
    className: "twitter",
  },
  {
    iconName: "icofont-linkedin",
    siteLink: "/",
    className: "linkedin",
  },
  {
    iconName: "icofont-instagram",
    siteLink: "/",
    className: "instagram",
  },
];

const categoriesList = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Shop",
    link: "/shop",
  },
  {
    text: "Services",
    link: "/services",
  },
  {
    text: "Study",
    link: "/study",
  },
  {
    text: "Arts",
    link: "/artgallery",
  },
  {
    text: "Blog",
    link: "/blog",
  },
  {
    text: "Contact",
    link: "/contact",
  },
  {
    text: "Policy",
    link: "/",
  },
  {
    text: "FAQs",
    link: "/about",
  },
];

const blogsChats = [
  {
    iconName: "icofont-twitter",
    desc: "loremipsum",
  },
  {
    iconName: "icofont-facebook",
    desc: "loremipsum",
  },
];

const Footer = () => {
  return (
    <footer className="style-2">
      <div className="footer">
        <div className="footer-component-container">
          <div className="col">
            <div className="footer-item our-address">
              <div className="footer-content">
                <div className="title">
                  <h2>{title}</h2>
                </div>
                <br />
                <div className="aboutgm-content">
                  <p className="description">{desc}</p>
                  <br></br>
                  <ul className="office-address lab-ul ">
                    {addressList.map((val, i) => (
                      <li key={i}>
                        <i className={val.iconName}>{val.text}</i>
                      </li>
                    ))}
                  </ul>
                  <br />
                  <br />
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="footer-item our-address">
              <div className="footer-inner">
                <div className="footer-content">
                  <div className="title">
                    <h2>{categoryTitle}</h2>
                  </div>
                  <div className="categories-content">
                    <ul className="office-address lab-ul">
                      {categoriesList.map((val, i) => (
                        <li key={i}>
                          <a href={val.link} className="category-link">
                            {val.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="footer-item our-address">
              <div className="footer-inner">
                <div className="footer-content">
                  <div className="title">
                    <h2>{blogTitle}</h2>
                  </div>
                  <div className="blog-content">
                    <ul className="office-address lab-ul ">
                      {blogsChats.map((val, i) => (
                        <li key={i}>
                          <i className={val.iconName}>{val.desc}</i>
                        </li>
                      ))}
                    </ul>
                    <br></br>
                    <ul className="lab-ul social-icons justify-content-center align-items-center">
                    {socialList.map((val, i) => (
                      <li key={i}>
                        <a href={val.siteLink} className={val.className}>
                          <i className={val.iconName}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="section-wrapper">
            <p className="copyright-complete">
              &copy; 2025{" "}
              <Link to="/">
                {" "}
                <p className="copyright-text">GM Business Services </p>
              </Link>
            </p>
          </div>
        </div>

        <div className="footer-overlay">
          <img
            src={FooterImageBackground}
            className="footer-overlay-image"
            alt="Decorative overlay"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
