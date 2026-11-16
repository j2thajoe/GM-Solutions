import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, getDocs, collection } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import "../assets/css/arts.css";

const ArtGallery = () => {
  const [artPieces, setArtPieces] = useState([]);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    "/images/background/Arts/gallerybackground8.jpg",
    "/images/background/Arts/gallerybackground2.jpg",
    "/images/background/Arts/gallerybackground3.jpg",
    "/images/background/Arts/gallerybackground4.jpg",
    "/images/background/Arts/gallerybackground5.jpg",
    "/images/background/Arts/gallerybackground6.jpg",
    "/images/background/Arts/gallerybackground7.jpg",
    "/images/background/Arts/gallerybackground1.jpg",
    "/images/background/Arts/gallerybackground9.jpg",
    "/images/background/Arts/gallerybackground10.jpg",
    "/images/background/Arts/gallerybackground11.jpg",
    "/images/background/Arts/gallerybackground12.jpg",
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "artworks"), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const art = {
          id: doc.id,
          ...doc.data(),
        };
        const localImage = localStorage.getItem(`artworkImage-${art.name}`);
        return {
          ...art,
          imageUrl: localImage || "/images/default-art.png",
        };
      });
      setArtPieces(data);
    });

    const interval = setInterval(() => {
      setBackgroundIndex(Math.floor(Math.random() * backgrounds.length));
    }, 100000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="art-gallery"
      style={{
        backgroundImage: `url(${backgrounds[backgroundIndex]})`,
      }}
    >
      <div className="gallery-content">
        <h1 className="gallery-title">Art Gallery</h1>
        <p className="gallery-vision">
          Our Vision and Mission: We curate the best art pieces for you!
        </p>
      </div>

      <div className="art-grid">
        {artPieces.map((art) => (
          <Link
            to={
              art.auction
                ? `/artauction/${art.id}`
                : `/art-information/${art.id}`
            }
            key={art.id}
          >
            <div className={`art-item ${art.auction ? "auction" : ""}`}>
              <img src={art.imageUrl} alt={art.name} />
              <p>{art.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtGallery;
