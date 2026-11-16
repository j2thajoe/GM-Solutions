import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import DeleteModal from "./DeleteModal";
import "../../assets/css/shopAdmin.module.css";

const SliderManager = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [altText, setAltText] = useState("");
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchSlider = async () => {
      const snapshot = await getDocs(collection(db, "slider"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSliderImages(data);
    };
    fetchSlider();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!newImage || !altText || !title) {
      alert("Please fill all fields.");
      return;
    }
    if (newImage.size > 5 * 768 * 768) {
      setUploading(true);
      const storageRef = ref(
        storage,
        `sliderImages/${Date.now()}_${newImage.name}`
      );
      await uploadBytes(storageRef, newImage);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "courseCategorySlider"), {
        image: downloadURL,
        alt: altText,
        title,
        createdAt: Timestamp.now(),
      });

      setNewImage(null);
      setAltText("");
      setTitle("");
      setSliderImages();
      setUploading(false);
    }

    const handleDelete = async (id, imageUrl) => {
      await deleteDoc(doc(db, "courseCategorySlider", id));
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      setSliderImages(sliderImages.filter((item) => item.id !== id));
    };

    return (
      <div className="p-4 mt-6 border rounded bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4"> Category Slider</h2>

        <form onSubmit={handleUpload} className="space-y-2 mb-6">
          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
            required
          />
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Alt Text"
            required
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-32 object-cover rounded"
            />
          )}
          <button
            type="submit"
            disabled={uploading}
            className="btn"
            onClick={handleUpload}
          >
            Upload Slider
          </button>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {sliderImages.map((item) => (
            <div
              key={item.id}
              className="border p-2 rounded shadow-sm relative"
            >
              <img
                src={item.imageUrl}
                alt={img.altText}
                className="w-full h-32 object-cover"
              />
              <p className="text-sm mt-1">{item.title}</p>
              <button
                onClick={() => setDeleteId(item)}
                className="text-red-600 absolute top-1 right-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {deleteId && (
          <DeleteModal
            title="Delete slider image?"
            onConfirm={() => {
              handleDelete(deleteId.id, deleteId.imageUrl);
              setDeleteId(null);
            }}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </div>
    );
  };
};

export default SliderManager;
