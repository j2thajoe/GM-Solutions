import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

//CSS
import "../index.css";
import "swiper/css";
import "../assets/css/admin.css";

//bootstrap css
import "../assets/css/bootstrap.min.css";
import "../assets/js/bootstrap.min.js/";

const WholeSiteImages = [
  "../../images/photoedits/stationaries1.jpeg",
  "../../images/photoedits/stationaries2.jpeg",
  "../../images/photoedits/stationaries3.jpeg",
];

const ShopProductImages = [
  "../../images/photoedits/stationaries1.jpeg",
  "../../images/photoedits/stationaries2.jpeg",
  "../../images/photoedits/stationaries3.jpeg",
];

const ServicesImages = [
  "../../images/photoedits/stationaries1.jpeg",
  "../../images/photoedits/stationaries2.jpeg",
  "../../images/photoedits/stationaries3.jpeg",
];

const StudyImages = [
  "../../images/photoedits/stationaries1.jpeg",
  "../../images/photoedits/stationaries2.jpeg",
  "../../images/photoedits/stationaries3.jpeg",
];

const ARTsImages = [
  "../../images/photoedits/stationaries1.jpeg",
  "../../images/photoedits/stationaries2.jpeg",
  "../../images/photoedits/stationaries3.jpeg",
];

const AdminHome = () => {
  const [currentImageindex, setCurrentImageIndex] = useState(0);
  const [siteImageIndex, setSiteImageIndex] = useState(0);
  const [shopImageIndex, setShopImageIndex] = useState(0);
  const [servicesImageIndex, setServicesImageIndex] = useState(0);
  const [studyImageIndex, setStudyImageIndex] = useState(0);
  const [artsImageIndex, setArtsImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          [
            { ShopProductImages, ServicesImages, StudyImages, ARTsImages }
              .length,
          ]
      );
    }, 120000); // 2 minutes (120000ms)

    return () => clearInterval(interval); // Cleanup the interval when component unmounts
  }, []);

  useEffect(() => {
    const siteInterval = setInterval(() => {
      setSiteImageIndex((i) => (i + 1) % WholeSiteImages.length);
    }, 5000);

    const shopInterval = setInterval(() => {
      setShopImageIndex((i) => (i + 1) % ShopProductImages.length);
    }, 5000);

    const servicesInterval = setInterval(() => {
      setServicesImageIndex((i) => (i + 1) % ServicesImages.length);
    }, 5000);

    const studyInterval = setInterval(() => {
      setStudyImageIndex((i) => (i + 1) % StudyImages.length);
    }, 5000);

    const artsInterval = setInterval(() => {
      setArtsImageIndex((i) => (i + 1) % ARTsImages.length);
    }, 5000);

    return () => {
      clearInterval(siteInterval);
      clearInterval(shopInterval);
      clearInterval(servicesInterval);
      clearInterval(studyInterval);
      clearInterval(artsInterval);
    };
  }, []);

  return (
    <div className="administrator-content-home style-4">
      <BackButton />
      <form className="administrator-form-container">
        <div className="administrator-content-container">
          <div className="administrator-block">
            <div className="administrator-button">
              <Link to="/CompleteSiteAdministrator">
                <img
                  className="administrator-image"
                  src={WholeSiteImages[siteImageIndex]}
                  alt="AdministratorCategory Images"
                />

                <div className="administrator-text-container">
                  <h2> FULL SITE</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="administrator-block">
            <div className="administrator-button">
              <Link to="/BusinessConsultancyAdministrator">
                <img
                  className="administrator-image"
                  src={ShopProductImages[shopImageIndex]}
                  alt="AdministratorCategory Images"
                />

                <div className="administrator-text-container">
                  <h2>BUSINESS</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="administrator-block">
            <div className="administrator-button">
              <Link to="/admin/ShopAdministrator">
                <img
                  className="administrator-image"
                  src={ShopProductImages[shopImageIndex]}
                  alt="AdministratorCategory Images"
                />

                <div className="administrator-text-container">
                  <h2> SHOP</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="administrator-block">
            <div className="administrator-button">
              <Link to="/admin/ServicesAdministrator">
                <img
                  className="administrator-image"
                  src={ServicesImages[servicesImageIndex]}
                  alt="AdministratorCategory Images"
                />

                <div className="administrator-text-container">
                  <h2> SERVICEs</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="administrator-block">
            <div className="administrator-button">
              <Link to="/admin/StudyAdministrator">
                <img
                  className="administrator-image"
                  src={StudyImages[studyImageIndex]}
                  alt="AdministratorCategory Images"
                />

                <div className="administrator-text-container">
                  <h2> LECTUREs </h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="administrator-block">
            <div className="administrator-button">
              <Link to="/admin/ARTsAdministrator">
                <img
                  className="administrator-image"
                  src={ARTsImages[artsImageIndex]}
                  alt="AdministratorCategory Images"
                />

                <div className="administrator-text-container">
                  <h2> ARTs </h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminHome;
