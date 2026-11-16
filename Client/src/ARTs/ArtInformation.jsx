import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ArtInformation = () => {
  const { id } = useParams();
  const [artPieces, setartPiecess] = useState(null);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "artworks"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setartPiecess(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!artPieces) return <div>Loading...</div>;

  return (
    <div className="art-info">
      <h1>{artPieces.name}</h1>
      <img src={artPieces.image} alt={artPieces.name} />
      <p>{artPieces.description}</p>
      <p>Category: {artPieces.category}</p>
      <p>Auction: {artPieces.auction ? "Yes" : "No"}</p>
    </div>
  );
};

export default ArtInformation;
