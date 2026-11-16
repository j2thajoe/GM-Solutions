import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import Cards from "./ProductCard";
import { db } from "../firebase";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Real-time listener for products
    const unsubscribe = onSnapshot(
      collection(db, "productCategories"),
      (snapshot) => {
        const categoryList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return data.category || data.title || data.name || "Unnamed";
        });
        const uniqueCategories = [...new Set(categoryList)];
        setCategories(uniqueCategories);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="widget-header">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Product Categories</h2>

          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <li
                key={index}
                className="bg-gray-200 rounded-xl p-2 text-center hover:bg-gray-300 cursor-pointer transition-all"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Cards />
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
