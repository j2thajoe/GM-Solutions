import React, { useState } from "react";
import BackButton from "../../../components/BackButton";
import "../../../index.css";
import "swiper/css";
import "../../../assets/css/posterdesign.css";
import { Swiper, SwiperSlide } from "swiper/react";

import PosterDesignContainerBackgroundImage from "../../../../public/images/background/Services/coloredart3.jpg";

//bootstrap css
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/js/bootstrap.min.js/";

//fonts and icons
import "../../../assets/css/icofont.min.css";
import "../../../assets/css/animate.css";
import "../../../assets/css/style.min.css";

const PosterDesign = () => {
  const [images, setImages] = useState(null);
  const [files, setFiles] = useState(null);
  const [color, setColor] = useState("#fffffff");
  const [paperSize, setPaperSize] = useState({
    A4: false,
    A3: false,
    A2: false,
  });
  const [paperType, setPaperType] = useState({
    Plain: false,
    Matte: false,
    Glossy: false,
    Certificate: false,
    Cardstock: false,
  });
  const [paperOrientation, setPaperOrientation] = useState({
    Portrait: false,
    Landscape: false,
  });
  const [colorHandles, setColorHandles] = useState({
    BackgroundColor: false,
    FontColor: false,
    ThemeColor: false,
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFiles(selectedFile.name);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.images[0];
    if (selectedImage) {
      setImages(selectedImage.name);
    }
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const [inputDetailedInformation, setInputDetailedInformation] = useState("");
  const handleDetailChange = (e) => {
    setInputDetailedInformation(e.target.value);
  };

  const handleDetailSubmit = () => {
    //this is the logic to save the user's specified detailed information
    console.log(
      "User specified information on what to be handled on the document has been saved:",
      inputDetailedInformation
    );
    setInputDetailedInformation("");
  };

  //logic to save the user's specified contact information

  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const handleContactInfoChange = (e) => {
    setInputPhoneNumber(e.target.value);
    setInputEmail(e.target.value);
  };

  const handleContactInfoSubmit = () => {
    console.log("Phone Number to be used has been saved:", inputPhoneNumber);
    setInputPhoneNumber("");

    console.log("Email to be used has been saved:", inputEmail);
    setInputEmail("");
  };

  const handleSubmit = () => {
    //where to handle file/form submission logic
    alert(`File: ${files}, Options: ${JSON.stringify(options)}`);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const renderColorOptions = () => {
    const colors = ["#FF5733", "#33FF57", "#"];
  };

  return (
    <div className="poster-design-container">
      <img
        src={PosterDesignContainerBackgroundImage}
        className="poster-design-overlay-image"
        alt="Decorative overlay"
      />

      <BackButton />

      <div className="PosterDesignHeader">
        <h1 className="header-text">
          Crying for ATTRACTIVE ATTENTION and DISPLAY??
        </h1>
        <br />
        <h2 className="header-subtext">
          Fill and uniquely specify the information routes below to have
          yourself an attractive poster
        </h2>
      </div>

      <div className="poster-design-title mt-4">
        <h3 className="title-text">
          Already have some information you would want for the poster in
          creation??
        </h3>
        <input
          className="poster-design-input"
          type="file"
          id="fileInput"
          accept=".txt,.pdf,.doc,.docx,.jpeg,.jpg,.png"
          onChange={handleFileChange}
        />
      </div>

      {files && (
        <div className="poster-design-fileinput mt-2">
          Selected File: {files}
        </div>
      )}

      <div className="content mt-4">
        <div className="content-level-1">
          <h3 className="poster-content-name">Poster SIZE:</h3>
          <div className="poster-content-options">
            <div className="poster-size">
              <label className="checkbox-complete">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="A4"
                  checked={paperSize.A4}
                  onChange={handleOptionChange}
                />
                A4 = 216 x 279mm (8.5 x 11 inches)
              </label>
            </div>
            <div className="poster-size">
              <label className="checkbox-complete">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="A3"
                  checked={paperSize.A3}
                  onChange={handleOptionChange}
                />
                A3 = 279 x 432mm (11 x 17 inches)
              </label>
            </div>
            <div className="poster-size">
              <label className="checkbox-complete">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="A2"
                  checked={paperSize.A2}
                  onChange={handleOptionChange}
                />
                A2 = 432 x 559mm (17 x 22 inches)
              </label>
            </div>
          </div>
        </div>

        <div className="content-level-2">
          <h3 className="poster-content-name">Paper TYPE</h3>
          <div className="poster-content-options">
            <div className="poster-paper-type">
              <label className="checkbox-complete">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="plain"
                  checked={paperType.Plain}
                  onChange={handleOptionChange}
                />
                Plain Paper
              </label>
            </div>
            <div className="poster-paper-type">
              <label className="checkbox-complete">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="matte"
                  checked={paperType.Matte}
                  onChange={handleOptionChange}
                />
                Matte Paper
              </label>
            </div>
            <div className="poster-paper-type">
              <label className="checkbox-complete">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="glossy"
                  checked={paperType.Glossy}
                  onChange={handleOptionChange}
                />
                Glossy
              </label>
            </div>
            <div className="poster-paper-type">
              <label className="checkbox-complete">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="certificate"
                  checked={paperType.Certificate}
                  onChange={handleOptionChange}
                />
                Certificate
              </label>
            </div>
          </div>
        </div>

        <div className="content-level-3">
          <div className="poster-content-options-2 mt-4">
            <h3 className="poster-content-name">
              Image(s) you would want hosted on your poster.
            </h3>
            <div className="form-container">
              <input
                className="poster-image-input"
                type="file"
                id="imageInput"
                accept=".jpeg,.jpg,.png"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="content-level-4">
          <div className="poster-content-options-3 mt-4">
            <h3 className="poster-content-name">
              InDepth detailing of what to do with the images i.e. what to
              correct within the images.
            </h3>

            <div className="form-container">
              <textarea
                value={inputDetailedInformation}
                onChange={handleDetailChange}
                className="detail-textarea"
                placeholder="Specify how you would like the document to be handled..."
                rows={4}
              />
              <br />
              <button className="submit-btn" onClick={handleDetailSubmit}>
                Submit Details
              </button>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="content-level-5">
          <div className="poster-content-options-4 mt-4">
            <h3 className="poster-content-name">Contact Information</h3>

            <div className="form-container">
              <div className="phone-intake">
                <h4>Phone</h4>
                <textarea
                  value={inputPhoneNumber}
                  onChange={handleContactInfoChange}
                  className="contact-textarea"
                  placeholder="Phone Number(s)"
                  rows={1}
                />
              </div>
              <br />
              <div className="email-intake">
                <h4>Email</h4>
                <textarea
                  value={inputEmail}
                  onChange={handleContactInfoChange}
                  className="contact-textarea"
                  placeholder="Email"
                  rows={1}
                />
              </div>
              <br />
              <button className="submit-btn" onClick={handleContactInfoSubmit}>
                Submit Contacts
              </button>
            </div>
          </div>

          <button
            className="upload-btn mt-4"
            onClick={handleSubmit}
            disabled={[!files, !images]}
          >
            Upload for Poster Design
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosterDesign;
