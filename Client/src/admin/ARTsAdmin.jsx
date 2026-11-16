import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import "../assets/css/admin.css";

const ARTsAdmin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate admin login
  const [newArtwork, setNewArtwork] = useState({
    name: "",
    description: "",
    image: null,
    auction: false,
    category: "All",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewArtwork((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImagePreview(reader.result);
        setNewArtwork((prev) => ({
          ...prev,
          imageBase64: base64,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleContinue = async () => {
    try {
      setUploading(true);

      if (newArtwork.imageBase64 && newArtwork.name) {
        localStorage.setItem(
          `artworkImage-${newArtwork.name}`,
          newArtwork.imageBase64
        );
      }

      await addDoc(collection(db, "artworks"), {
        name: newArtwork.name,
        description: newArtwork.description,
        category: newArtwork.category,
        auction: newArtwork.auction,
        timestamp: new Date(),
      });

      alert("Artwork added successfully!");
      setNewArtwork({
        name: "",
        description: "",
        imageBase64: null,
        auction: false,
        category: "All",
      });

      setImagePreview(null);
      setShowModal(false);
      navigate("/artgallery");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload artwork. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  if (!isLoggedIn) {
    return (
      <div>
        NOT an ADMIN!! Please log in as administrator to access this page
      </div>
    );
  }

  return (
    <div className="admin-page">
      <BackButton />

      <form className="artwork-admin-form-container" onSubmit={handleSubmit}>
        <h2>Add New Art Piece</h2>
        <br />
        <input
          className="artwork-name"
          type="text"
          name="name"
          value={newArtwork.name}
          onChange={handleInputChange}
          required
          placeholder="Artwork Name"
        />

        <textarea
          className="artwork-description"
          name="description"
          value={newArtwork.description}
          onChange={handleInputChange}
          required
          placeholder="Artwork Description"
        />

        <button
          className="add-image-button"
          type="button"
          onClick={() => document.getElementById("image-input").click()}
        >
          Add Image
        </button>
        <input
          className="image-input"
          id="image-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div style={{ marginTop: "30px" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "240px",
                height: "auto",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
          </div>
        )}

        <div className="category-select-container">
          <label className="category-text">Category:</label>
          <select
            className="category-select"
            name="category"
            value={newArtwork.category}
            onChange={handleInputChange}
          >
            <option value="All">All</option>
            <option value="Paintings">Paintings</option>
            <option value="Drawings">Drawings</option>
            <option value="Sculptures">Sculptures</option>
            <option value="Photography">Photography</option>
          </select>
        </div>
        <div>
          <label className="checkbox-label-container">
            ForAuction:
            <input
              className="auction-checkbox"
              type="checkbox"
              name="auction"
              checked={newArtwork.auction}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button
          className="add-artwork-button"
          type="submit"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Artwork"}
        </button>
      </form>

      {/* Modal Confirmation Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Confirm Artwork Details is correct?</h4>
            <div className="modal-details">
              <p>
                <strong>Name:</strong> {newArtwork.name}
              </p>
              <p>
                <strong>Description:</strong> {newArtwork.description}
              </p>
              <p>
                <strong>Category:</strong> {newArtwork.category}
              </p>
              <p>
                <strong>Auction:</strong> {newArtwork.auction ? "Yes" : "No"}
              </p>
              {imagePreview && (
                <div>
                  <p>
                    <strong>Image Preview:</strong>
                  </p>
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{ width: "80px", height: "auto" }}
                  />
                </div>
              )}
            </div>
            <div className="modal-buttons">
              <button onClick={handleContinue}>Continue</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARTsAdmin;
