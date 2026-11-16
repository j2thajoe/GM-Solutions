// File: src/components/ProductInformation.jsx
import React, { useEffect, useState, useContext } from "react";
import BackButton from "../components/BackButton";
import { ClientContext } from "../../contexts/ClientContext";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/productinformation.css";

const ProductInformation = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(ClientContext);

  const handleAddToCart = async () => {
    if (!auth.currentUser) {
      toast.warn("You must be logged in to add to cart.");
      setTimeout(() => navigate("/login"), 4000);
      return;
    }
    const productData = {
      ...product,
      id,
      title: product.title || product.name,
      localImageKey: product.localImageKey,
    };

    addToCart(productData);
    toast.success("Product added to cart!");

    try {
      const cartRef = doc(db, "carts", auth.currentUser.uid);
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

      await setDoc(cartRef, {
        products: existingCart,
      });
    } catch (error) {
      console.error("Failed to save cart to Firestore:", error);
      toast.error("Failed to save to cart!");
    }
  };

  const handleBuyNow = () => {
    const base64Image = localStorage.getItem(product.localImageKey);

    if (!auth.currentUser) {
      toast.warn("You must be logged in to proceed with buying.");
      setTimeout(() => navigate("/login"), 4000);
      return;
    }

    const productToBuy = {
      id,
      name: product.name,
      price: product.price,
      title: product.title || product.name,
      description: product.description,
      image: localStorage.getItem(product.localImageKey),
    };

    navigate("/checkout", {
      state: {
        products: [productToBuy],
        location: selectedLocation,
      },
    });
  };

  const handleAddToWishlist = () => {
    if (!auth.currentUser) {
      toast.warn("You must be logged in to add your wish to your wishlist.");
      setTimeout(() => navigate("/login"), 4000);
      return;
    }

    toast.success("Product added to wishlist!");
  };

  useEffect(() => {
    const loadProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <div className="p-4">Loading product...</div>;

  const base64Image = localStorage.getItem(product.localImageKey);

  return (
    <div className="product-information">
      <BackButton />

      <h2 className="product-title">PRODUCT INFORMATION</h2>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="product-container">
        <img
          src={base64Image || "/placeholder.png"}
          alt={product.name}
          className="product-image"
        />

        <h2 className="product-name">{product.name}</h2>
        <div className="product-description-class">
          <p className="product-description">{product.description}</p>
        </div>
        <h3 className="product-category-title">Category:</h3>
        <h3 className="product-category">{product.category}</h3>
        <br></br>
        <h3 className="product-price-title">Previous Price:</h3>
        <h4 className="product-previous-price">
          {product.previousprice
            ? `$${product.previousprice}`
            : "No previous price"}
        </h4>
        <br></br>
        <h3 className="product-price-title">Price:</h3>
        <h2 className="product-price">${product.price}</h2>
        <br></br>
        <p className="product-stock">Stock: {product.stock}</p>
        <p className="product-rating">Rating: {product.rating}</p>
        <div className="product-actions">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <Link to="/cart">Add to Cart</Link>
          </button>
          <button className="buy-now-button" onClick={handleBuyNow}>
            <Link to="/checkout">Buy Now</Link>
          </button>
          <button className="wishlist-button" onClick={handleAddToWishlist}>
            <Link to="/wishlist">Add to Wishlist</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
