import React, { useState, useEffect } from "react";
import "/src/assets/css/services.css";
import Data from "../../../services.json";
import PageHeader from "../../../components/PageHeader";
import ComputerRepairandMaintenancelogo from "/images/photoedits/colorainbow.jpg";
import NetworkingandConnectivitylogo from "/images/photoedits/printer3.jpg";
import ComputerSoftwareInstallationandSupportlogo from "/images/photoedits/printer3.jpg";
import UpgradesandPerformanceEnhancementlogo from "/images/eCitizenServices.png";
import { Link } from "react-router-dom";

const ComputerLaptopSolutions = () => {
  const [gridList, setGridList] = useState(true);
  const [services, setServices] = useState(Data);

  return (
    <div className="services-content">
      <div className="computerrepairandmaintenance-wrapper d-flex flex-column">
        <Link to="/ComputerRepairandMaintenance">
          <div className="computerrepairandmaintenance-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h2 className="">Computer Repair & Maintenance</h2>
              <p className="brief-service-detailing">
                Our photo editing services enhance, retouch, and transform your
                images to perfection. From color correction and background
                removal to advanced manipulations, we ensure your photos look
                stunning, professional, and polished for any purpose.
              </p>
            </div>
            <img
              className="services-image"
              src={ComputerRepairandMaintenancelogo}
              alt="computerrepairandmaintenance_logo"
            />
          </div>
        </Link>
      </div>

      <div className="networkingandconnectivity-wrapper d-flex flex-column">
        <Link to="/NetworkingandConnectivity">
          <div className="networkingandconnectivity-textbox d-flex justify-content-center align-items-center">
            <img
              className="services-image"
              src={NetworkingandConnectivitylogo}
              alt="networkingandconnectivity_logo"
            />
            <div className="content-right">
              <h2 className="">Networking & Connectivity </h2>
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

      <div className="computersoftwareinstallationandsupport-wrapper d-flex flex-column">
        <Link to="/ComputerSoftwareInstallationandSupport">
          <div className="computersoftwareinstallationandsupport-textbox d-flex justify-content-center align-items-center">
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
              src={ComputerSoftwareInstallationandSupportlogo}
              alt="computersoftwareinstallationandsupport_logo"
            />
          </div>
        </Link>
      </div>

      <div className="upgradesandperformanceenhancement-wrapper d-flex flex-column">
        <Link to="/UpgradesandPerformanceEnhancement">
          <div className="upgradesandperformanceenhancement-textbox d-flex justify-content-center align-items-center ">
            <img
              className="services-image"
              src={UpgradesandPerformanceEnhancementlogo}
              alt="upgradesandperformanceenhancement_logo"
            />
            <div className="content-right">
              <h2 className="">Upgrades & Performance Enhancement</h2>
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
    </div>
  );
};

export default ComputerLaptopSolutions;
