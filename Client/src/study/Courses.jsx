import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import ReactPlayer from "react-player";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "../assets/css/study.css";

export default function Courses() {
  const [lectureData, setLectureData] = useState([]);
  const [active, setActive] = useState(null);

  // fetch once on mount
  useEffect(() => {
    (async () => {
      const q = query(collection(db, "lectures"), orderBy("createdAt", "asc"));
      const snap = await getDocs(q);
      setLectureData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  // group by course
  const byCourse = lectureData.reduce((acc, lec) => {
    (acc[lec.course] ||= []).push(lec);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="Our Lectures"
        subTitle="Study with US"
        curPage="Study"
      />

      <div className="courses-container">
        {lectureData.map((v) => (
          <div key={v.id} className="thumb-card" onClick={() => setActive(v)}>
            <img src={v.thumbnail} alt={v.title} />
            <h2>{v.title}</h2>
            <p>{v.description}</p>
            <h3>{v.comments}</h3>
          </div>
        ))}
      </div>

      {active && (
        <div className="player-overlay" onClick={() => setActive(null)}>
          <div className="player-wrapper" onClick={(e) => e.stopPropagation()}>
            <ReactPlayer
              url={active.url}
              playing
              controls
              width="100%"
              height="100%"
            />
            <button className="close-btn" onClick={() => setActive(null)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
