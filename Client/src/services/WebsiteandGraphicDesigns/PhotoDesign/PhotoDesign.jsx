import React, { useState, useEffect } from "react";
import "../../../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ColorContrastAnalyzer from "../../../components/color-styling/ColorContrast.jsx";
import ColorSaturationAnalyzer from "../../../components/color-styling/ColorStaturation.jsx";
import ColorCorrectionTool from "../../../components/color-styling/ColorCorrection.jsx";
import ColorVibrancyModifier from "../../../components/color-styling/ColorVibrancy.jsx";

//bootstrap css
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/js/bootstrap.min.js/";

//fonts and icons
import "../../../assets/css/icofont.min.css";
import "../../../assets/css/animate.css";
import "../../../assets/css/style.min.css";

const PhotoDesign = () => {
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
      <div className="PhotoEditingHeader">
        <h1>PhotoEditing</h1>
        <br />
        <h2>
          Need photo(s) to be edited? Fill the below requirements, required or
          optional, to have your image(s) perfect in sight
        </h2>
      </div>

      <br />
      <br />

      <div className="mt-4">
        <h3>Insert Image(s) for Editing</h3>
        <input
          type="file"
          id="imageInput"
          accept=".jpeg,.jpg,.png"
          onChange={handleImageChange}
        />
        <button onClick={handleImageSubmission}>Send Image(s)</button>
      </div>

      {images && <div className="mt-2">Choose Image: {images}</div>}

      <div className="mt-4">
        <h3>
          Both understanding what to DO and to be DONE to the photos(s) in
          relation to their function and intend with them. Brief detailing of
          what you want the images(s) to be look like after editing.
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
          <button onClick={handleDetailSubmit}>Submit Details</button>
          <br />
        </div>
      </div>

      <br />
      <br />

      <div className="mt-4">
        <h3>
          InDepth detailing of what to do with the images i.e. what to correct
          within the images.
        </h3>
        <div className="form-container">
          <textarea
            value={inputDetailedInformation}
            onChange={handleDetailChange}
            className="detail-textarea"
            placeholder="Specify how you would like the document to be handled..."
            rows={3}
            cols={10}
          ></textarea>
          <br />
          <button onClick={handleDetailSubmit}>Submit Details</button>
        </div>
      </div>

      <br />
      <br />

      <div className="color-styling">
        <ColorCorrectionTool />
        <ColorContrastAnalyzer />
        <ColorVibrancyModifier />
        <ColorSaturationAnalyzer />
      </div>

      <br />
      <br />

      <div className="contact-information">
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
          <button onClick={handleContactInfoSubmit}>Submit Contacts</button>
        </div>
      </div>

      <br />
      <br />

      <button
        className="btn btn-primary mt-4"
        onClick={handleSubmit}
        disabled={[!images]}
      >
        Upload for Poster Design
      </button>
    </div>
  );
};

export default PhotoDesign;
