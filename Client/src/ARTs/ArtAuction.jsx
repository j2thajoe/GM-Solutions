import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PageHeader from "../components/PageHeader";
import socketIOClient from "socket.io-client";
import "../assets/css/arts.css";

const ArtAuction = ({}) => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [isAuctionLive, setIsAuctionLive] = useState(true);
  const [bidHistory, setBidHistory] = useState([]);
  const [userBid, setUserBid] = useState("");

  //load artwork from firestore
  useEffect(() => {
    const fetchArtwork = async () => {
      const docRef = doc(db, "artworks", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setArtwork(data);
        setCurrentBid(data.startingBid || 0);
      } else {
        console.error("Artwork not found");
      }
    };
    fetchArtwork();
  }, [id]);

  useEffect(() => {
    if (!artwork?.endTime) return;
    const auctionEndTime = new Date(artwork.endTime);
    const intervalId = setInterval(() => {
      if (new Date() > auctionEndTime) {
        setIsAuctionLive(false);
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [artwork?.endTime]);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:5000");

    socket.on("bidUpdate", (newBid) => {
      setCurrentBid(newBid);
      setBidHistory((prevHistory) => [
        ...prevHistory,
        { bid: newBid, timestamp: new Date().toISOString() },
      ]);
    });

    return () => socket.disconnect();
  }, []);

  const handleBid = () => {
    if (parseFloat(userBid) > currentBid) {
      setCurrentBid(parseFloat(userBid));
      setBidHistory([
        ...bidHistory,
        { bid: userBid, timestamp: new Date().toISOString() },
      ]);
      setUserBid("");
    } else {
      alert("Bid must be higher than the current bid.");
    }
  };

  if (!artwork) return <div>Loading artwork...</div>;

  return (
    <div className="auction-art-piece">
      <PageHeader
        title="ARTS and Portaits"
        subTitle="Auction with us. Portrait with us"
        curPage="ARTs"
      />
      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        className="art-piece-image"
      />
      <h2>{artwork.title}</h2>
      <p>Artist: {artwork.artist}</p>
      <p>{artwork.description}</p>
      <p>Starting Bid: ${artwork.startingBid}</p>
      <p>Current Bid: ${currentBid}</p>

      <div className="auction-bid">
        {isAuctionLive ? (
          <>
            <input
              type="number"
              value={userBid}
              onChange={(e) => setUserBid(e.target.value)}
              placeholder="Enter your bid"
            />
            <button onClick={handleBid}>Place Bid</button>
          </>
        ) : (
          <p>Auction Ended</p>
        )}
      </div>

      <div className="auction-bid-history">
        <h3>Bid History</h3>
        <ul>
          {bidHistory.map((bid, index) => (
            <li key={index}>
              ${bid.bid} - {new Date(bid.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtAuction;
