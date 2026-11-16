import React from "react";
import { ClientContext } from "../contexts/ClientContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ProductCard = ({ product, gridList }) => {
  const { client, setClient } = useContext(ClientContext);
  const { imageUrl, name, description, price, company } = product;

  const handleAddToCart = () => {
    if (client) {
      addToCart(product);
    } else {
      alert("Please log in to add products to your cart.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!client) return alert;

    const existing = client.wishlist?.some((item) => item.id === product.id);
    if (existing) return alert("Item is already in your wishlist.");

    const updatedWishlist = [...(client.wishlist || []), product];
    const updatedClient = { ...client, wishlist: updatedWishlist };

    setClient(updatedClient);
    localStorage.setItem("client", JSON.stringify(updatedClient));

    // Update Firestore
    const clientRef = doc(db, "clients", client.id);
    await updateDoc(clientRef, { wishlist: updatedWishlist });
  };

  return (
    <div
      className={`product-card ${gridList ? "grid" : "list"}`}
      key={product.id}
    >
      <img
        className="productcard-image"
        src={product.imageUrl || "/fallback-image.png"}
        alt={product.name || "No Name"}
      />
      <h3 className="productcard-name">{product.name || "Unnamed Product"}</h3>
      <p className="productcard-description">
        {product.description || "No Description Available"}
      </p>
      <p className="productcard-price">${product.price ?? "N/A"}</p>
      <p className="productcard-company">
        {product.company || "Unknown Company"}
      </p>
      <div className="flex gap-2 mt-3">
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
          onClick={handleAddToWishlist}
        >
          ♥ Wishlist
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
