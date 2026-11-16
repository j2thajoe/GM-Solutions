import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate admin login
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: "",
    category: "All",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the product (Here we're adding it to localStorage for simplicity)
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added successfully!");
    setNewProduct({
      name: "",
      price: "",
      description: "",
      stock: "",
      image: "",
      category: "All",
    });
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
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Stock Quantity:</label>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
          >
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
            <option value="Home">Home</option>
          </select>
        </div>

        <div>
          <label>Delivery System</label>
          <input
            type="text"
            name="delivery"
            value={newProduct.delivery}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
