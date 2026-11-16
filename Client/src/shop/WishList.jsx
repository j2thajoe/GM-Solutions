// src/components/Wishlist.jsx
import React, { useContext, useEffect, useState } from "react";
import BackButton from "../../../components/BackButton";
import { ClientContext } from "../../contexts/ClientContext.jsx";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "../assets/css/wishlist.css";

const WishList = () => {
  const { client, setClient } = useContext(ClientContext);
  const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (client?.wishlist) {
            setWishlist(client.wishlist);
        } else {
            const localClient = JSON.parse(localStorage.getItem("client"));
            if (localClient?.wishlist){ setWishlist(localClient.wishlist);
        }
    }
    }, [client]);
    
     const handleRemove = async (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);

    // Sync with localStorage and context
    const updatedClient = { ...client, wishlist: updatedWishlist };
    setClient(updatedClient);
    localStorage.setItem("client", JSON.stringify(updatedClient));

    // Sync with Firestore
    const userDocRef = doc(db, "clients", client.id);
    await updateDoc(userDocRef, { wishlist: updatedWishlist });
  };

  return (
    <div className="wishlist-container">
      <BackButton />
      
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
           <div key={item.id} className="wishlist-item">
              <img
                src={item.imageUrl || "/placeholder.png"}
                alt={item.name}
                className="wishlist-item-img"
              />
              <div className="wishlist-item-details">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
