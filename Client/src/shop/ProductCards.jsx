import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/productcards.css";

const ProductCards = ({ product }) => {
  const base64Image = localStorage.getItem(product.localImageKey);

  return (
    <Link to={`/product/${product.id}`}>
      <div className="product-card">
        <img
          src={base64Image || "/placeholder.png"}
          alt={product.name}
          className="w-28 h-auto object-cover rounded mb-2"
        />
        <div className="product-info">
          <h2 className="text-xl font-semibold mt-2">{product.name}</h2>

          <p className="line-through">${product.previousprice}</p>
          <p className="text-green-600 font-bold">${product.price}</p>
          <p className="text-gray-500">Stock: {product.stock}</p>
          <p className="text-gray-500">Rating: {product.rating}</p>
          <p className="text-gray-500">Category: {product.category}</p>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <Link to={`/product/${product.id}`} className="view-details-link">
          View Details
        </Link>
      </div>
    </Link>
  );
};

export default ProductCards;
