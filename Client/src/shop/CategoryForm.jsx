import React, { useState } from "react";
import { db, addDoc, collection, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "../assets/css/forms.css";

const CategoryForm = () => {
  const [previewURL, setPreviewURL] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [titleText, setTitleText] = useState("");
  const [altText, setAltText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !titleText.trim() ||
      !altText.trim() ||
      !imageFile ||
      !categoryName.trim()
    ) {
      setMessage("All fields are required.");
      return;
    }

    if (!titleText.trim()) {
      setMessage("Provide the title name for the category.");
      return;
    }

    if (!altText.trim()) {
      setMessage("Provide the alt name for the category.");
      return;
    }
    if (!imageFile) {
      setMessage("Provide a relevant category image.");
      return;
    }

    if (!categoryName.trim()) {
      setMessage("Category name cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const imageRef = ref(storage, `categoryImages/${imageFile.name}`);

      console.log("Starting upload…");
    const uploadTask = uploadBytesResumable(imageRef, imageFile);
      console.log("Image uploaded");

      console.log("Fetching download URL...");
      const downloadURL = await getDownloadURL(imageRef);
      console.log("Download URL:", downloadURL);

      console.log("Saving to Firestore...");
      await addDoc(collection(db, "productCategories"), {
        title: titleText.trim(),
        alt: altText.trim(),
        category: categoryName.trim(),
        image: downloadURL,
        timestamp: new Date(),
      });
      console.log("GREAT ...category saved!");

      setMessage("Category added successfully!");
      setCategoryName(""); // reset input
      setAltText("");
      setTitleText("");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage("Failed to add category. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <form onSubmit={handleSubmit} className="categoryFormHolder">
        <h2 className="text-lg font-semibold mb-3">Add Product Category</h2>
        <input
          className="titleInput"
          type="text"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
          placeholder="Enter category title name"
          required
        />

        <input
          className="altInput"
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Enter alt text"
          required
        />
        <select
          categoryName="categoryInput"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Phone&Accessories">Phones & Accessories</option>
          <option value="Laptops&Accessories">Computers & Laptops</option>
          <option value="Electricals&PowerSolutions">
            Electricals & Power Solutions
          </option>
          <option value="Networking">Networking</option>
          <option value="E-Waste">E-Waste</option>
          <option value="SmartHome&Security">Smart Home & Security</option>
          <option value="Office&StationarySupplies">
            Office & Stationary Supplies
          </option>
          <option value="Lifestyle&Fashion">Lifestyle & Fashion</option>
          <option value="Home&KitchenAppliances">
            Home & Kitchen Appliances
          </option>
          <option value="Tools&Hardware">Tools & Hardware</option>
          <option value="Medical&HealthEquipment">
            Medical & Health Equipment
          </option>
        </select>
        <input
          className="imageInput"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);
            if (file) {
              setPreviewURL(URL.createObjectURL(file)); // generates preview
            } else {
              setPreviewURL(""); // clear preview if no file selected
            }
          }}
          required
        />
        {previewURL && (
          <img
            src={previewURL}
            alt="Preview"
            className="w-full h-auto mt-2 rounded shadow"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn"
        >
          {loading ? "Saving..." : "Add Categgory"}
        </button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default CategoryForm;
