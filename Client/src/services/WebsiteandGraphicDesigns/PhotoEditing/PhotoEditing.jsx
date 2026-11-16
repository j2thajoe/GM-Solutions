import React, { useState } from "react";
import BackButton from "../../../components/BackButton";
import "../../../assets/css/photoediting.css";
import "../../../index.css";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import ColorContrastAnalyzer from "../../../components/color-styling/ColorContrast.jsx";
import ColorSaturationAnalyzer from "../../../components/color-styling/ColorStaturation.jsx";
import ColorCorrectionTool from "../../../components/color-styling/ColorCorrection.jsx";
import ColorVibrancyModifier from "../../../components/color-styling/ColorVibrancy.jsx";

import PhotoEditingContainerBackgroundImage from "../../../../public/images/background/Services/coloredart6.jpg";

//bootstrap css
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/js/bootstrap.min.js/";

//fonts and icons
import "../../../assets/css/icofont.min.css";
import "../../../assets/css/animate.css";
import "../../../assets/css/style.min.css";

const PhotoEditing = () => {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(null);
  const [color, setColor] = useState("#fffffff");
  const [paperSize, setPaperSize] = useState({
    A4: null,
    A3: null,
    A2: null,
  });

  const [colorHandles, setColorHandles] = useState({
    BackgroundColor: null,
    FontColors: null,
    ThemeColor: null,
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFiles(selectedFile.name);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImages(selectedImage.name);
    }
  };

  const handleImageSubmission = () => {
    alert(`Image submitted: ${images}`);
    // To also handle additional submission logic here like sending data to a server.
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    //where to handle image submission logic
    alert(`Image: ${images}, Options: ${JSON.stringify(options)}`);
  };

  const [inputDetailedInformation, setInputDetailedInformation] = useState("");
  const handleDetailChange = (e) => {
    setInputDetailedInformation(e.target.value);
  };

  const [inputSpecifiedInformation, setInputSpecifiedInformation] =
    useState("");
  const handleSpecifiedChange = (e) => {
    setInputSpecifiedInformation(e.target.value);
  };

  const handleDetailSubmit = () => {
    //this is the logic to save the user's specified detailed information
    console.log(
      "User specified information on what to be handled on the document has been saved:",
      inputSpecifiedInformation
    );
    setInputSpecifiedInformation("");
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

  return (
    <div className="photo-editing-container">
      <img
        src={PhotoEditingContainerBackgroundImage}
        className="photo-editing-overlay-image"
        alt="Decorative overlay"
      />

      <BackButton />

      <div className="PhotoEditingHeader">
        <h1 className="header-text">PhotoEditing</h1>
        <br />
        <h2 className="header-subtext">
          Need photo(s) to be edited? Fill the requirements below, required or
          optional, to have your image(s) perfect in sight
        </h2>
      </div>

      <br />
      <br />

      <div className="content mt-4">
        <div className="content-level-1">
          <div className="photoediting-content-options-1">
          <h3 className="photoediting-content-name">Insert Image(s) for Editing</h3>
          <input
            type="file"
            id="imageInput"
            accept=".jpeg,.jpg,.png"
            onChange={handleImageChange}
          />
            <button className="submit-btn" onClick={handleImageSubmission}>Send Image(s)</button>
          </div>
        </div>

        {images && <div className="mt-2">Choose Image: {images}</div>}

        <div className="content-level-2 mt-4">
          <div className="photoediting-content-options-2">
          <h3>
            Both understanding what to DO and to be DONE to the photos(s) in
            relation to their function and intend with them. Brief detailing of
            what you want the images(s) should look like after editing.
          </h3>
          <br />
          <div className="detailediting-container">
            <textarea
              value={inputSpecifiedInformation}
              onChange={handleSpecifiedChange}
              className="detail-textarea"
              placeholder="Specify how you would like the image(s) to be handled..."
              rows={3}
              cols={10}
            ></textarea>
            <br />
            <button className="submit-btn" onClick={handleDetailSubmit}>Submit Details</button>
              <br />  
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="content-level-3 mt-4">
          <div className="photoediting-content-options-3">
          <h3>
            InDepth detailing of what to do with the images i.e. what to correct
            within the images.
          </h3>
          <div className="form-container">
            <textarea
              value={inputDetailedInformation}
              onChange={handleDetailChange}
              className="detail-textarea"
              placeholder="What should be corrected of the images..."
              rows={3}
              cols={10}
            ></textarea>
            <br />
            <button className="submit-btn" onClick={handleDetailSubmit}>Submit Details</button>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="color-styling">
          <div className="photoediting-content-options-4">
          <ColorCorrectionTool />
          <ColorContrastAnalyzer />
          <ColorVibrancyModifier />
            <ColorSaturationAnalyzer />
            </div>
        </div>

        <br />
        <br />

        <div className="contact-information">
          <div className="photoediting-content-options-5">
          <h3>Contact Information</h3>

          <div className="form-container">
            <h4>Phone</h4>
            <textarea
              value={inputPhoneNumber}
              onChange={handleContactInfoChange}
              className="contact-textarea"
              placeholder="Phone Number(s)"
              rows={1}
              cols={2}
            ></textarea>
            <br />
            <textarea
              value={inputEmail}
              onChange={handleContactInfoChange}
              className="contact-textarea"
              placeholder="Email"
              rows={1}
              cols={6}
            ></textarea>
            <br />
            <button className="submit-btn" onClick={handleContactInfoSubmit}>Submit Contacts</button>
            </div>
          </div>
        </div>

        <br />
        <br />

        <button
          className="upload-btn mt-4"
          onClick={handleSubmit}
          disabled={[!images]}
        >
          Upload for Poster Design
        </button>
      </div>
    </div>
  );
};

export default PhotoEditing;
