import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../contexts/ClientContext";
import { CartContext } from "../../contexts/CartContext";
import BackButton from "../components/BackButton";
import "../assets/css/cart.css";

import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Cart = () => {
  const { client, removeFromCart, setClient } = useContext(ClientContext);
  const [cartItems, setCartItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const fetchCart = async () => {
      if (!client || !client.id) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "clients", client.id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const cart = userData.cart || [];
          setCartItems(cart);
          setSelected(cart.map((item) => item.id));

          // Also update context + localStorage
          const updatedClient = { ...client, cart };
          setClient(updatedClient);
          localStorage.setItem("client", JSON.stringify(updatedClient));
        }
      } catch (error) {
        console.error("Failed to fetch cart from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [client, setClient]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedItems = cartItems.filter((item) => selected.includes(item.id));
  const total = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) =>
      selected.includes(item.id)
    );
    navigate("/checkout", { state: { products: selectedProducts } });
  };

  const handleRemove = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setSelected((prev) => prev.filter((itemId) => itemId !== id));

    if (client) {
      const updatedClient = { ...client, cart: updatedCart };
      setClient(updatedClient);
      localStorage.setItem("client", JSON.stringify(updatedClient));

      try {
        const userDocRef = doc(db, "clients", client.id);
        await updateDoc(userDocRef, { cart: updatedCart });
      } catch (error) {
        console.error("Failed to update Firestore cart:", error);
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your cart...</p>;

  if (cartItems.length === 0) {
    return <p className="text-center mt-10">Your cart is empty.</p>;
  }
  if (!client || !client.id) {
    setLoading(false);
    return;
  }

  return (
    <div className="cart-container">
      <BackButton />

      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
              />
              <img
                src={
                  item.image ||
                  (item.localImageKey
                    ? localStorage.getItem(item.localImageKey)
                    : "/placeholder.png")
                }
                alt={item.name}
              />
              <div className="cart-item-info">
                <h4>{item.title || item.name}</h4>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <button onClick={() => handleRemove(item.id)}>Delete</button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <p>Total: ${total.toFixed(2)}</p>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
