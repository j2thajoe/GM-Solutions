import React, { useState, useEffect } from "react";
import "/src/assets/css/services.css";
import Data from "../services.json";
import PageHeader from "../components/PageHeader";
import Printerlogo from "/images/photoedits/printer3.jpg";
import WebsitenGraphicDesignslogo from "/images/photoedits/colorainbow.jpg";
import eCitizenServiceslogo from "/images/eCitizenServices.png";
import Solutionslogo from "/images/eCitizenServices.png";
import GeneralRepairsnMaintenancelogo from "/images/photoedits/colorainbow.jpg";
import { Link } from "react-router-dom";

const Services = () => {
  const [gridList, setGridList] = useState(true);
  const [services, setServices] = useState(Data);

  return (
    <div className="services-content">
      <PageHeader
        title="SURVEY with us for MORE and Better Services"
        curPage="Services"
      />

      <div className="printing-services-wrapper d-flex flex-column">
        <Link to="/PrintingBinding">
          <div className="printing-services-textbox d-flex justify-content-center align-items-center">
            <img
              className="services-image"
              src={Printerlogo}
              alt="printer_logo"
            />
            <div className="content-right">
              <h2 className="">Print, Bind and Lamination Hub</h2>
              <p className="brief-service-detailing">
                We provide high-quality printing, binding, and lamination
                services to meet your personal, academic, and business needs.
                Whether you need documents printed for official use, reports and
                projects neatly bound, or important papers laminated for
                durability, our services ensure professional results with a fast
                turnaround time.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="websitengraphics-designs-wrapper d-flex flex-column">
        <Link to="/WebsitenGraphicDesigns">
          <div className="websitengraphics-designs-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h2 className="">Website & Graphic Designs</h2>
              <p className="brief-service-detailing">
                We've got plenty of services under designs. Our photo editing
                services enhance, retouch, and transform your images to
                perfection. From color correction and background removal to
                advanced manipulations, we ensure your photos look stunning,
                professional, and polished for any purpose.
              </p>
            </div>
            <img
              className="services-image"
              src={WebsitenGraphicDesignslogo}
              alt="photoediting_logo"
            />
          </div>
        </Link>
      </div>
      <div className="kra-wrapper d-flex flex-column">
        <Link to="/eCitizenServices">
          <div className="kra-textbox d-flex justify-content-center align-items-center ">
            <img
              className="services-image"
              src={eCitizenServiceslogo}
              alt="eCitizenServices_logo"
            />
            <div className="content-right">
              <h2 className="">ECitizen Services</h2>
              <p className="brief-service-detailing">
                We offer KRA services, including PIN registration and retrieval,
                tax return filing, tax compliance certificate (TCC)
                applications, and VAT, PAYE, and tax consultation. Our team
                ensures that individuals and businesses stay compliant with tax
                regulations while making the process smooth and hassle-free.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="solutions-wrapper d-flex flex-column">
        <Link to="/Solutions">
          <div className="solutions-textbox d-flex justify-content-center align-items-center ">
            <div className="content-left">
              <h2 className="">Solutions</h2>
              <p className="brief-service-detailing">
                We offer KRA services, including PIN registration and retrieval,
                tax return filing, tax compliance certificate (TCC)
                applications, and VAT, PAYE, and tax consultation. Our team
                ensures that individuals and businesses stay compliant with tax
                regulations while making the process smooth and hassle-free.
              </p>
            </div>
            <img
              className="services-image"
              src={Solutionslogo}
              alt="solutions_logo"
            />
          </div>
        </Link>
      </div>

      <div className="general-repair-and-maintenance-wrapper d-flex flex-column">
        <Link to="/GeneralRepairsandMaintenance">
          <div className="general-repair-and-maintenance-textbox d-flex justify-content-center align-items-center">
            <img
              className="services-image"
              src={GeneralRepairsnMaintenancelogo}
              alt="general_repairs_and_maintenance_logo"
            />
            <div className="content-right">
              <h2 className="">General Repairs & Maintenance</h2>
              <p className="brief-service-detailing">
                We've got plenty of services under designs. Our photo editing
                services enhance, retouch, and transform your images to
                perfection. From color correction and background removal to
                advanced manipulations, we ensure your photos look stunning,
                professional, and polished for any purpose.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Services;
