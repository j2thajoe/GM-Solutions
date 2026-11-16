import React, { createContext, useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../src/firebase";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(() => {
    const saved = localStorage.getItem("client");
    return saved ? JSON.parse(saved) : null;
  });

  const syncClientData = async (clientId) => {
    try {
      const docRef = doc(db, "clients", clientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const clientData = { ...docSnap.data(), id: clientId };
        setClient(clientData);
        localStorage.setItem("client", JSON.stringify(clientData));
      } else {
        logoutClient();
      }
    } catch (error) {
      console.error("Failed to sync client:", error);
    }
  };

  const addToCart = async (product) => {
    if (!client) return;

      const existingCart = client.cart || [];
  const alreadyExists = existingCart.some((item) => item.id === product.id);

    if (alreadyExists) return;
  
    const base64Image = localStorage.getItem(product.localImageKey);
  const productWithImage = {
    ...product,
    image: base64Image || "/placeholder.png",
    selected: true,
  };

    const updatedCart = [...existingCart, { ...product, selected: true }]
    const updatedClient = { ...client, cart: updatedCart };

    setClient(updatedClient);
    localStorage.setItem("client", JSON.stringify(updatedClient));

    await updateDoc(doc(db, "clients", client.id), {
      cart: updatedCart,
    });
  };

  const addToWishlist = async (product) => {
    if (!client) return;

    const updatedWishlist = [...(client.wishlist || []), product];
    const updatedClient = { ...client, wishlist: updatedWishlist };

    setClient(updatedClient);
    localStorage.setItem("client", JSON.stringify(updatedClient));

    await updateDoc(doc(db, "clients", client.id), {
      wishlist: updatedWishlist,
    });
  };

  const updateProfile = async (newData) => {
    if (!client || !client.id) return;

    const updatedClient = { ...client, ...newData };
    setClient(updatedClient);
    localStorage.setItem("client", JSON.stringify(updatedClient));

    await updateDoc(doc(db, "clients", client.id), newData);
  };

  const logoutClient = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Sign out failed:", err);
    }
    setClient(null);
    localStorage.removeItem("client");
    localStorage.removeItem("profileImage");
  };

  useEffect(() => {
    if (client?.id) {
      syncClientData(client.id);
    }
  }, []);

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        addToCart,
        addToWishlist,
        updateProfile,
        logoutClient,
        syncClientData,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
