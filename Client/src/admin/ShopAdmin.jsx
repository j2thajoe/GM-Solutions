import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { db, storage } from "../firebase";
import {
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import socket from "../socket";
import { useNavigate } from "react-router-dom";
import "../assets/css/shopadmin.css";

const ShopAdmin = () => {
  useEffect(() => {
    // Example: Listen to product update event
    socket.on("productAdded", (data) => {
      console.log("Product added via socket:", data);
      // You can show a toast, alert, or reload product list
      alert(`Product "${data.name}" was just added by another admin.`);
    });

    socket.on("productDeleted", (data) => {
      console.log("Product deleted via socket:", data);
      alert(`Product "${data.name}" was deleted by another admin.`);
    });

    // Clean up on unmount
    return () => {
      socket.off("productAdded");
      socket.off("productDeleted");
    };
  }, []);

  const normalizeCategory = (str) =>
    str.toLowerCase().replace(/\s+/g, "").replace(/&/g, "and");

  const navigate = useNavigate();
  const initialProductState = {
    name: "",
    description: "",
    price: "",
    previousprice: "",
    stock: "",
    category: "",
    rating: 0,
    imageFile: null,
    createdAt: new Date(),
  };

  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [product, setProduct] = useState(initialProductState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      setProduct((prev) => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.imageFile) {
      alert("Please select a Product Image.");
      return;
    }

    if (product.imageFile.size > 10 * 1024 * 1024) {
      alert("Image is too large. Please upload images under 10MB.");
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;

        const imageKey = `product-image-${uuidv4()}`;
        localStorage.setItem(imageKey, base64String);

        const docRef = await addDoc(collection(db, "products"), {
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          previousprice: parseFloat(product.previousprice),
          stock: parseInt(product.stock),
          category: {
            slug: normalizeCategory(product.category),
            displayName: product.category,
          },

          rating: parseFloat(product.rating) || 0,
          localImageKey: imageKey,
          createdAt: serverTimestamp(),
        });

        socket.emit("productAdded", {
          id: docRef.id,
          name: product.name,
          localImageKey: imageKey,
          createdAt: new Date(),
        });

        alert("Congrats! ✅ Product added successfully.");
        setProduct({
          ...initialProductState,
        });
        setPreviewUrl(null);
        setUploading(false);
        navigate("/shop");
      };

      reader.readAsDataURL(product.imageFile);
    } catch (err) {
      console.error("Error initiating upload:", err);
      alert("❌ Failed to add product: " + err.message);
      setUploading(false);
    }
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!deleteName.trim()) return alert("Enter a product name to delete.");

    try {
      const q = query(
        collection(db, "products"),
        where("name", "==", deleteName.trim())
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("Product not found.");
        return;
      }

      snapshot.forEach(async (docSnap) => {
        const docRef = doc(db, "products", docSnap.id);
        const product = docSnap.data();

        // Delete image from Storage if available
        if (product.imageUrl) {
          const imageRef = ref(storage, product.imageUrl);
          try {
            await deleteObject(imageRef);
          } catch (err) {
            console.warn("Image deletion failed:", err.message);
          }
        }

        await deleteDoc(docRef);
        alert(`Deleted product: ${product.name}`);

        // 🔌 Emit socket event
        socket.emit("productDeleted", {
          name: product.name,
          description: product.description,
          price: product.price,
          previousprice: product.previousprice,
          stock: product.stock,
          category: product.category,
          rating: product.rating,
          imageUrl: product.imageUrl,
          createdAt: product.createdAt,
          // Include the document ID for reference
          id: docSnap.id,
        });

        // Optionally reset deleteName
        setDeleteName("");
      });
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting product: " + err.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <BackButton />

      <h1 className="text-3xl font-bold mb-3">SHOP ADMIN PANEL</h1>
      <form onSubmit={handleFormSubmit} className="shop-admin-form">
        <h2 className="form-header1 text-lg font-semibold mb-2">UPLOAD Product </h2>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="shop-admin-inputs border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="shop-admin-inputs border p-2 rounded"
          required
        />
        <input
          type="number"
          name="previousprice"
          placeholder="PreviousPrice"
          value={product.previousprice}
          onChange={handleChange}
          className="shop-admin-inputs border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="shop-admin-inputs border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          className="shop-admin-inputs border p-2 rounded"
          required
        />
        <select
          className="shop-admin-select"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="phonesandaccessories">Phones & Accessories</option>
          <option value="laptopsandaccessories">Computers & Laptops</option>
          <option value="electricalsandpowersolutions">
            Electricals & Power Solutions
          </option>
          <option value="networking">Networking</option>
          <option value="ewaste">E-Waste</option>
          <option value="smartheandsecurity">Smart Home & Security</option>
          <option value="officeandstationerysupplies">
            Office & Stationery Supplies
          </option>
          <option value="lifestyleandfashion">Lifestyle & Fashion</option>
          <option value="homeandkitchenappliances">
            Home & Kitchen Appliances
          </option>
          <option value="toolsandhardware">Tools & Hardware</option>
          <option value="medicalandhealthequipment">
            Medical & Health Equipment
          </option>
        </select>
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          step="0.1"
          min="0"
          max="5"
          value={product.rating}
          onChange={handleChange}
          className="shop-admin-inputs border p-2 rounded"
        />
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          className="shop-admin-inputs border p-2 rounded"
          required
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-48 h-auto max-h-64 object-contain rounded"
          />
        )}
        <button type="submit" className="submit-button" disabled={uploading}>
          {uploading ? "Uploading..." : "UPLOAD"}
        </button>
        <br />
      </form>
      <br />
      <br />
      <form onSubmit={handleDeleteClick} className="shop-admin-form">
        <h2 className="form-header2 text-lg font-semibold mb-1 ">DELETE Product</h2>
        <br />
        <input
          type="text"
          name="deleteName"
          placeholder="Enter product name to DELETE"
          value={deleteName}
          onChange={(e) => setDeleteName(e.target.value)}
          className="shop-admin-inputs border p-2 rounded"
          required
        />
        <br />
        <button
          type="button"
          className="delete-button mt-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete();
          }}
        >
          {uploading ? "Deleting..." : "DELETE"}
        </button>
      </form>
    </div>
  );
};

export default ShopAdmin;
