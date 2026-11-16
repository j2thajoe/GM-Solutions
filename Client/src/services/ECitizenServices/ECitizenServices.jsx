import React, { useState, useEffect } from "react";
import "/src/assets/css/services.css";
import Data from "../../services.json";
import KRAlogo from "/images/KRA.png";
import HELBlogo from "/images/HEF.png";
import NTSAlogo from "/images/NTSA.png";
import NSSFlogo from "/images/NSSF.png";
import SHIFlogo from "/images/SHIF.png";
import KUCCPSlogo from "/images/KUCCPS.png";
import eCitizenLogo from "/images/eCitizen.png";
import { Link } from "react-router-dom";

const ECitizenServices = () => {
  const [gridList, setGridList] = useState(true);
  const [services, setServices] = useState(Data);

  return (
    <div className="services-content">
        <div className="kra-wrapper d-flex flex-column">
        <Link to="/KRA">
          <div className="kra-textbox d-flex justify-content-center align-items-center ">
            <img className="services-image" src={KRAlogo} alt="kra_logo" />
            <div className="content-right">
              <h2 className="">KRA</h2>
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
      <div className="helb-wrapper d-flex flex-column">
        <Link to="/HEF">
          <div className="helb-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h2 className="">HEF</h2>
              <p className="brief-service-detailing">
                Our HEF services assist students with loan applications,
                tracking, and repayment guidance. Whether you're applying for a
                new loan, checking your loan status, or seeking clearance
                certificates, we simplify the process to help you access
                education financing with ease.
              </p>
            </div>
            <img className="services-image" src={HELBlogo} alt="helb_logo" />
          </div>
        </Link>
      </div>
      <div className="ntsa-wrapper d-flex flex-column">
        <Link to="/NTSA">
          <div className="ntsa-textbox d-flex justify-content-center align-items-center">
            <img className="services-image" src={NTSAlogo} alt="ntsa_logo" />
            <div className="content-right">
              <h2 className="">NTSA</h2>
              <p className="brief-service-detailing">
                We provide NTSA services, including Smart Driving License
                applications, NTSA TIMS account registration, logbook transfers,
                PSV badge applications, and vehicle inspection booking. Our
                assistance ensures that you navigate the transport sector
                requirements efficiently.
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="nssf-wrapper d-flex flex-column">
        <Link to="/NSSF">
          <div className="nssf-textbox d-flex justify-content-center align-items-center ">
            <div className="content-left">
              <h2 className="">NSSF</h2>
              <p className="brief-service-detailing">
                Our NSSF services help individuals and businesses with
                registration, contribution tracking, and benefits claims.
                Whether you need to register as an employee, update your
                details, or claim your pension, we provide guidance for a
                seamless experience.
              </p>
            </div>
            <img className="services-image" src={NSSFlogo} alt="nssf_logo" />
          </div>
        </Link>
      </div>
      <div className="shif-wrapper d-flex flex-column">
        <Link to="/SHIF">
          <div className="shif-textbox d-flex justify-content-center align-items-center">
            <img className="services-image" src={SHIFlogo} alt="SHIF_logo" />
            <div className="content-right">
              <h2 className="">SHIF</h2>
              <p className="brief-service-detailing">
                We offer SHIF services, including registration, updating
                personal details, contribution tracking, and benefits claims.
                Our support ensures you access affordable healthcare under
                Kenya's universal health coverage system without any
                difficulties.
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="kuccps-wrapper d-flex flex-column">
        <Link to="/KUCCPS">
          <div className="kuccps-textbox d-flex justify-content-center align-items-center">
            <div className="content-left">
              <h2 className="">KUCCPS</h2>
              <p className="brief-service-detailing">
                Our KUCCPS services help students with course applications,
                revision of choices, checking placement results, and selecting
                the right institutions. We guide students through the university
                and college placement process to ensure they make informed
                decisions about their education.
              </p>
            </div>
            <img
              className="services-image"
              src={KUCCPSlogo}
              alt="kuccps_logo"
            />
          </div>
        </Link>
      </div>

      <div className="ecitizen-wrapper d-flex flex-column">
        <Link to="/eCitizen">
          <div className="ecitizen-textbox d-flex justify-content-center align-items-center">
            <img
              className="services-image"
              src={eCitizenLogo}
              alt="eCitizen_logo"
            />
            <div className="content-right">
              <h2 className="">eCITIZEN</h2>
              <p className="brief-service-detailing">
                We provide eCitizen services, assisting with passport
                applications and renewals, national ID replacements, birth and
                death certificate applications, business registration, land
                searches, and other government-related services. Our goal is to
                make accessing government services quick, efficient, and
                stress-free.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ECitizenServices;