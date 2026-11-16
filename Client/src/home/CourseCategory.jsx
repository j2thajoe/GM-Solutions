import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCategorySlider from "./sliders/CourseCategorySlider";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import "../assets/css/category.css";

const subTitle = "Come, study with us";
const title = "ONLINE STUDIES";
const subTitle2 =
  "Join our lecturers for tutoring in a course or course unit of your selection.";
const btnText = "Join Lectures";

const CourseCategory = () => {
  const [courseCategory, setCourseCategory] = useState([]);

  useEffect(() => {
    const fetchLectureThumbnails = async () => {
      try {
        const q = query(
          collection(db, "lectures"),
          orderBy("createdAt", "asc")
        );
        const snap = await getDocs(q);

        const courses = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            alt: data.title,
            src: data.thumbnail, // ✅ Use the same thumbnail as in Courses.jsx
            youtubeUrl: data.url, // ✅ Link to same YouTube/Video
          };
        });

        setCourseCategory(courses);
      } catch (error) {
        console.error("Error fetching lecture thumbnails:", error);
      }
    };

    fetchLectureThumbnails();
  }, []);

  return (
    <div className="category-section style-4 padding-tb">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">{subTitle}</span>
          <h1 className="title">{title}</h1>
          <br></br>
          <span className="subtitle2">{subTitle2}</span>
        </div>
        <CourseCategorySlider images={courseCategory} />
        <br></br>
        <div className="button-holder">
          <Link to="/study" className="lab-btn">
            <span>{btnText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCategory;
