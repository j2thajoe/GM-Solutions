// ProductForm.jsx
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../assets/css/forms.css";

export default function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    company: "",
    price: "",
    oldPrice: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, company, price, oldPrice, stock } = form;
    if (!name || !category || !price || !stock || !company || !imageFile) {
      alert("Fill all required fields.");
      return;
    }

    setUploading(true);
    try {
      // 1) upload image
      const storageRef = ref(
        storage,
        `products/${Date.now()}-${imageFile.name}`
      );
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // 2) write Firestore doc
      await addDoc(collection(db, "products"), {
        name,
        category,
        company,
        price: parseFloat(price),
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        stock: parseInt(stock, 10),
        imageUrl,
        createdAt: Timestamp.now(),
      });

      // reset & notify parent
      setForm({
        name: "",
        category: "",
        company: "",
        price: "",
        oldPrice: "",
        stock: "",
      });
      setImageFile(null);
      setPreview(null);
      onProductAdded?.();
      alert("Product added!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Error saving product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="productFormHolder">
      <h2 className="text-lg font-semibold mb-3">Product Data Information</h2>

      <input
        className="nameInput"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <select
        className="categoryInput"
        value={form.category}
        onChange={(e) => setCategory(e.target.value)}
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
        className="companyInput"
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Company"
        required
      />
      <input
        className="priceInput"
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        className="oldPriceInput"
        type="number"
        name="oldPrice"
        value={form.oldPrice}
        onChange={handleChange}
        placeholder="Previous Price"
      />
      <input
        className="stockInput"
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock Left"
        required
      />
      <input
        className="imageInput"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
      />
      {preview && <img src={preview} alt="Preview" className="preview-img" />}
      <button type="submit" disabled={uploading} className="btn">
        {uploading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}
