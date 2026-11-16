import React, { useState, useEffect } from "react";
import "/src/assets/css/services.css";
import Data from "../../../services.json";
import PageHeader from "../../../components/PageHeader";
import ConnectivityandNetworklogo from "/images/photoedits/printer3.jpg";
import MobileRepairandMaintenancelogo from "/images/photoedits/colorainbow.jpg";
import SIMandeSIMServiceslogo from "/images/eCitizenServices.png";
import MobileSoftwareInstallationandSupportlogo from "/images/photoedits/printer3.jpg";
import { Link } from "react-router-dom";

const MobileSolutions = () => {
  const [gridList, setGridList] = useState(true);
  const [services, setServices] = useState(Data);

  return (
    <div className="services-content">
      <div className="connectivityandnetwork-services-wrapper d-flex flex-column">
        <Link to="/ConnectivityandNetworkServices">
          <div className="connectivityandnetwork-services-textbox d-flex justify-content-center align-items-center">
            <img
              className="services-image"
              src={ConnectivityandNetworklogo}
              alt="connectivityandnetwork_logo"
            />
            <div className="content-right">
              <h2 className="">Connectivity & Network Services</h2>
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

      <div className="mobilerepairandmaintenance-wrapper d-flex flex-column">
        <Link to="/MobileRepairandMaintenance">
          <div className="mobilerepairandmaintenance-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h2 className="">Mobile Repair & Maintenance</h2>
              <p className="brief-service-detailing">
                Our photo editing services enhance, retouch, and transform your
                images to perfection. From color correction and background
                removal to advanced manipulations, we ensure your photos look
                stunning, professional, and polished for any purpose.
              </p>
            </div>
            <img
              className="services-image"
              src={MobileRepairandMaintenancelogo}
              alt="mobilerepairandmaintenance_logo"
            />
          </div>
        </Link>
      </div>
      <div className="SIMandeSIMServices-wrapper d-flex flex-column">
        <Link to="/SIMandeSIMServices">
          <div className="SIMandeSIMServices-textbox d-flex justify-content-center align-items-center ">
            <img
              className="services-image"
              src={SIMandeSIMServiceslogo}
              alt="SIMandeSIMServices_logo"
            />
            <div className="content-right">
              <h2 className="">SIM & eSIM Services</h2>
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

      <div className="mobilesoftwareinstallationandsupport-wrapper d-flex flex-column">
        <Link to="/MobileSoftwareInstallationandSupport">
          <div className="mobilesoftwareinstallationandsupport-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h2 className="">Software Installation & Support</h2>
              <p className="brief-service-detailing">
                Our photo editing services enhance, retouch, and transform your
                images to perfection. From color correction and background
                removal to advanced manipulations, we ensure your photos look
                stunning, professional, and polished for any purpose.
              </p>
            </div>
            <img
              className="services-image"
              src={MobileSoftwareInstallationandSupportlogo}
              alt="mobilesoftwareinstallationandsupport_logo"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileSolutions;
