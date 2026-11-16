import React, { useState, useEffect } from "react";
import "/src/assets/css/services.css";
import Data from "../../../../services.json";
import { Link } from "react-router-dom";

const ComputerRepairandMaintenance = () => {
  const [gridList, setGridList] = useState(true);
  const [services, setServices] = useState(Data);

  return (
    <div className="services-content">
      <div className="computerrepairandmaintenance-wrapper d-flex flex-column">
        <Link to="/ComputerRepairandMaintenance">
          <div className="computerrepairandmaintenance-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h3 className="">SCREEN Replacement</h3>
              <p className="brief-service-detailing">
                Our photo editing services enhance, retouch, and transform your
                images to perfection. From color correction and background
                removal to advanced manipulations, we ensure your photos look
                stunning, professional, and polished for any purpose.
              </p>
            </div>
          </div>
        </Link>
      </div>
        <div className="computerrepairandmaintenance-wrapper d-flex flex-column">
        <Link to="/ComputerRepairandMaintenance">
          <div className="computerrepairandmaintenance-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h3 className="">KEYBOARD Replacement</h3>
              <p className="brief-service-detailing">
                Our photo editing services enhance, retouch, and transform your
                images to perfection. From color correction and background
                removal to advanced manipulations, we ensure your photos look
                stunning, professional, and polished for any purpose.
              </p>
            </div>
          </div>
        </Link>
      </div>
        <div className="computerrepairandmaintenance-wrapper d-flex flex-column">
        <Link to="/ComputerRepairandMaintenance">
          <div className="computerrepairandmaintenance-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h3 className="">BATTERY Replacement</h3>
              <p className="brief-service-detailing">
                Our photo editing services enhance, retouch, and transform your
                images to perfection. From color correction and background
                removal to advanced manipulations, we ensure your photos look
                stunning, professional, and polished for any purpose.
              </p>
            </div>
          </div>
        </Link>
      </div>
        <div className="computerrepairandmaintenance-wrapper d-flex flex-column">
        <Link to="/ComputerRepairandMaintenance">
          <div className="computerrepairandmaintenance-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h3 className="">FAN Replacement</h3>
              <p className="brief-service-detailing">
                Our photo editing services enhance, retouch, and transform your
                images to perfection. From color correction and background
                removal to advanced manipulations, we ensure your photos look
                stunning, professional, and polished for any purpose.
              </p>
            </div>
          </div>
        </Link>
      </div>
        <div className="computerrepairandmaintenance-wrapper d-flex flex-column">
        <Link to="/ComputerRepairandMaintenance">
          <div className="computerrepairandmaintenance-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h3 className="">Motherboard and Hardware Fixes</h3>
              <p className="brief-service-detailing">
                Our photo editing services enhance, retouch, and transform your
                images to perfection. From color correction and background
                removal to advanced manipulations, we ensure your photos look
                stunning, professional, and polished for any purpose.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};  

export default ComputerRepairandMaintenance;

    
