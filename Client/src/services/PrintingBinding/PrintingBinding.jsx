import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import "../../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../assets/css/printingbinding.css";

//bootstrap css
import "../../assets/css/bootstrap.min.css";
import "../../assets/js/bootstrap.min.js/";

//fonts and icons
import "../../assets/css/icofont.min.css";
import "../../assets/css/animate.css";
import "../../assets/css/style.min.css";

//background images

import BackgroundImage1 from "../../../public/images/background/Services/coloredart1.jpg";
import BackgroundImage2 from "../../../public/images/background/Services/coloredart2.jpg";
import BackgroundImage3 from "../../../public/images/background/Services/coloredart3.jpg";

const PrintingBinding = () => {
  const [file, setFile] = useState(null);
  const [inputSpecifiedInformation, setInputSpecifiedInformation] =
    useState("");
  const [options, setOptions] = useState({
    print: false,
    promotional_printing: false,
    standard_document_printing: false,
    photo_printing: false,
    custom_printing: false,
    binding: false,
    laminating: false,
    editing: false,
  });
  const [isPromotionalVisible, setIsPromotionalVisible] = useState(false);
  const [isStandardDocumentVisible, setIsStandardDocumentVisible] =
    useState(false);
  const [isPhotoPrintingVisible, setIsPhotoPrintingVisible] = useState(false);
  const [isCustomPrintingVisible, setIsCustomPrintingVisible] = useState(false);
  const [isBindingVisible, setIsBindingVisible] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile.name);
    }
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    //where to handle form submission logic
    alert(`File: ${file}, Options: ${JSON.stringify(options)}`);
  };

  const handleDetailChange = (e) => {
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

  return (
    <div className="printing-binding-container">
      <BackButton />

      <form className="printnbinding-form-container">
        <div className="footer-overlay">
          <img
            src={BackgroundImage3}
            className="printnbinding-overlay-image"
            alt="Decorative overlay"
          />
        </div>
        <h1 className="printnbinding-header">Need to Print a Document?</h1>
        <br></br>
        <div>
          <input
            className="document-editing-input"
            type="file"
            id="fileInput"
            accept=".jpg, .png, .pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          {file && <div className="mt-2">Selected File: {file}</div>}
        </div>
        <br></br>
        <br></br>
        <div className="promotional-formats-container mt-3">
          <h2 className="printing-styling-formats">
            Print Structure and Format:
          </h2>
          <br></br>
          <br />
          <div>
            <h3
              onClick={() => setIsPromotionalVisible(!isPromotionalVisible)}
              className="clickable-header"
            >
              Promotional Formats
            </h3>

            {isPromotionalVisible && (
              <div className="formats">
                <div className="formats-content">
                  <label className="format-labels">Posters</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="Posters"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="formats-content">
                  <label className="format-labels">Banners/Flyers</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="Banners/Flyers"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels">Brochures</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="Brochures"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
          </div>
          <br />
          <br />
          <div>
            <h3
              onClick={() =>
                setIsStandardDocumentVisible(!isStandardDocumentVisible)
              }
              className="clickable-header"
            >
              Standard Document Printing Formats
            </h3>

            {isStandardDocumentVisible && (
              <div className="formats">
                <div className="formats-content">
                  <label className="format-labels">Single-Sided</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="Singlesided"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="formats-content">
                  <label className="format-labels">
                    Double-Sided / Back2Back
                  </label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="DoubleSided"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels">
                    Monochrome / Black & White
                  </label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="Monochrome"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels">Colored</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="colored"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
          </div>
          <br />
          <br />
          <div>
            <h3
              onClick={() => setIsPhotoPrintingVisible(!isPhotoPrintingVisible)}
              className="clickable-header"
            >
              Photo Printing
            </h3>

            {isPhotoPrintingVisible && (
              <div className="formats">
                <div className="formats-content">
                  <label className="format-labels"> Passport Photo</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="passport-photo"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />{" "}
                </div>

                <div className="formats-content">
                  <label className="format-labels"> Photo Sticker</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="photo-sticker"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels"> A4 Photos</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="A4Photo"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels"> Laptop Stickers</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="laptop-sticker"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels"> Phone Stickers</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="phone-sticker"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
          </div>
          <br />
          <br />
          <div>
            <h3
              onClick={() =>
                setIsCustomPrintingVisible(!isCustomPrintingVisible)
              }
              className="clickable-header"
            >
              Customized Printing
            </h3>

            {isCustomPrintingVisible && (
              <div className="formats">
                <div className="formats-content">
                  <label className="format-labels"> T-shirts & Hoodies</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="Tshirt&Hoodie"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels">Water Bottles</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="waterbottle"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels">Caps</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="cap"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels"> Bags</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="bag"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels"> Phone Stickers</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="phone-sticker"
                    accept=".jpg, .png, .pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
          </div>
          <br />
        </div>

        <div className="mt-4">
          <h2 className="printing-styling-formats">
            Select Additional Options:
          </h2>
          <br />
          <div>
            <h3
              onClick={() => setIsBindingVisible(!isBindingVisible)}
              className="clickable-header"
            >
              Binding
            </h3>

            {isBindingVisible && (
              <div className="formats">
                <div className="formats-content">
                  <label className="format-labels">Spiral Binding</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="spiral-binding"
                    checked={options.binding}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="formats-content">
                  <label className="format-labels">
                    Hardcover/BlackBook Binding
                  </label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="blackbook-binding"
                    checked={options.binding}
                    onChange={handleOptionChange}
                  />
                </div>
              </div>
            )}
          </div>
          <br></br>

          <div className="formats">
            <div className="extra-formats-content">
              <label className="format-labels">
                Laminating:A4 sized paper sheet
              </label>
              <input
                type="checkbox"
                name="laminating"
                checked={options.laminating}
                onChange={handleOptionChange}
              />
            </div>
            <div className="extra-formats-content">
              <label className="format-labels">Editing</label>
              <input
                type="checkbox"
                name="editing"
                checked={options.editing}
                onChange={handleOptionChange}
              />
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="form-container">
            <textarea
              value={inputSpecifiedInformation}
              onChange={handleDetailChange}
              className="detail-textarea"
              placeholder="Specificy how you would like the document to be handled..."
              rows={6}
              cols={18}
            ></textarea>
            <br />
            <button onClick={handleDetailSubmit} className="printnbinding-btn" >Submit Details</button>
          </div>

          <button
            className="btn btn-primary mt-4"
            onClick={handleSubmit}
            disabled={!file}
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrintingBinding;
