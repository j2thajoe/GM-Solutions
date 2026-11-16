// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
   const [total, setTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

   useEffect(() => {
     const newTotal = cartItems.reduce(
       (acc, item) => acc + item.price * item.quantity,
       0
     );
     setTotal(newTotal);
   }, [cartItems]);


  const addToCart = (product) => {
    setCartItems((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems; // prevent duplicates
      }
      return [...prevItems, { ...product, selected: true }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleSelect = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => (item.selected ? total + item.price : total),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        total,
        addToCart,
        removeFromCart,
        toggleSelect,
        getTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
