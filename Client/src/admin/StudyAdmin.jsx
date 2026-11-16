// src/components/LectureAdmin.jsx
import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import "../assets/css/studyAdmin.css";

import LecturerImageBackground from "../../public/images/background/Admin/brownleaves3.jpg";

export default function StudyAdmin() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [lectures, setLectures] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLectures = async () => {
      const snapshot = await getDocs(collection(db, "lectures"));
      const list = snapshot.docs.map((doc) => ({
        id: String(doc.id),
        ...doc.data(),
      }));
      setLectures(list);
    };
    fetchLectures();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !url.trim() || !description.trim()) {
      return alert("All fields are required.");
    }

    setLoading(true);
    try {
      const videoId = new URL(url).searchParams.get("v");
      const thumbnail = videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : "";

      const docRef = await addDoc(collection(db, "lectures"), {
        title,
        url,
        description,
        thumbnail,
        createdAt: Timestamp.now(),
      });

      setLectures((prev) => [
        ...prev,
        { id: docRef.id, title, url, description, thumbnail },
      ]);

      setTitle("");
      setUrl("");
      setDescription("");
      alert("Lecture added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add lecture.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    const confirm = window.confirm("Delete selected lectures?");
    if (!confirm) return;

    try {
      for (const id of selectedIds) {
        await deleteDoc(doc(db, "lectures", id));
      }

      setLectures((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
      setSelectedIds([]);
    } catch (err) {
      console.error("Failed to delete:", err);
      <div className="footer-overlay">
        <img
          src={FooterImageBackground}
          className="footer-overlay-image"
          alt="Decorative overlay"
        />
      </div>;
      alert("Error deleting selected lectures.");
    }
  };

  return (
    <div className="studyadmin-wrapper">
       <div className="lecture-overlay">
          <img
            src={LecturerImageBackground}
            className="lecture-overlay-image"
            alt="Decorative overlay"
          />
        </div>
      <form onSubmit={handleSubmit} className="lecture-admin-form">
        <BackButton />

        <h2 className="form-header1">ADD LECTURE</h2>
        <br></br>
        <input
          placeholder="Lecture Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="lecture-admin-inputs border p-2 rounded"
          required
        />
        <br></br>
        <input
          placeholder="YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="lecture-admin-inputs border p-2 rounded"
          required
        />
        <br></br>
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="lecture-admin-inputs border p-2 rounded"
          required
        />
        <br></br>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Saving…" : "ADD LECTURE"}
        </button>

       
      </form>

      <div className="lecture-admin-container">
        <div className="lecture-list">
          <h3>AVAILABLE LECTURES</h3>
          {lectures.length === 0 ? (
            <p>No lectures found.</p>
          ) : (
            <ul className="lecture-items">
              {lectures.map((lecture) => (
                <li key={lecture.id} className="lecture-item">
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span>{lecture.title} </span>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(String(lecture.id))}
                      onChange={() => handleSelect(String(lecture.id))}
                    />
                  </label>
                </li>
              ))}
            </ul>
          )}

          {selectedIds.length > 0 && (
            <button onClick={handleDeleteSelected} className="delete-button">
              Delete Selected
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
