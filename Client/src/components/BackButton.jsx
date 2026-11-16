// src/components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/backbutton.css";

import backiconNormal from "../assets/images/icon/previous-normal.png";
import backiconHover from "../assets/images/icon/previous-hover.png";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="back-button"
      onClick={() => navigate(-1)}
    >
       <img
        src={backiconNormal}
        alt="Back"
        className="back-icon"
        dataHover={backiconHover}
      />
    </button>
  );
};

export default BackButton;