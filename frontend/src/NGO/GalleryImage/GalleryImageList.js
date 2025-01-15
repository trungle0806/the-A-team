import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import các biểu tượng Edit và Delete
import {
  fetchGalleryImages,
  deleteGalleryImage,
} from "../Service/GalleryImageService";
import GalleryImageForm from "./GalleryImageForm";
import "./GalleryImageList.css";

const GalleryImageList = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadGalleryImages();
  }, [searchQuery, currentPage]);

  const loadGalleryImages = async () => {
    const data = await fetchGalleryImages(searchQuery, currentPage, 10);
    const items = data?.$values || [];
    setGalleryImages(items);
    setTotalPages(data.totalPages || 1);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      await deleteGalleryImage(id);
      loadGalleryImages();
    }
  };

  const handleEdit = (data) => {
    setIsEditing(true);
    setEditData(data);
  };

  const handleSave = async (formData) => {
    console.log("Saved data:", formData);
    await loadGalleryImages();
    setIsEditing(false);
    setEditData(null);
  };

  return (
    <div className="GalleryImageList-container">
      <h1 className="GalleryImageList-title">Gallery Images</h1>
      <input
        type="text"
        placeholder="Search by caption"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="GalleryImageList-search-input"
      />
      {!isEditing ? (
        <GalleryImageForm
          onSubmit={handleSave}
          className="GalleryImageList-form"
        />
      ) : (
        <GalleryImageForm
          onSubmit={handleSave}
          initialData={editData}
          className="GalleryImageList-form"
        />
      )}
      <ul className="GalleryImageList-items">
        {galleryImages.map((image) => (
          <li key={image.imageId} className="GalleryImageList-item">
            {image.fileName  ? (
              <img
                src={`http://localhost:5024/images/${image.fileName}`}
                alt={image.caption}
                className="GalleryImageList-image"
              />
            ) : (
              <p className="GalleryImageList-no-image">No image available</p>
            )}
            <p className="GalleryImageList-caption">{image.caption}</p>
            <button
              onClick={() => handleEdit(image)}
              className="GalleryImageList-edit-btn"
            >
              <FaEdit className="GalleryImageList-icon" />
            </button>
            <button
              onClick={() => handleDelete(image.imageId)}
              className="GalleryImageList-delete-btn"
            >
              <FaTrashAlt className="GalleryImageList-icon" />
            </button>
          </li>
        ))}
      </ul>
      <div className="GalleryImageList-pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
            className="GalleryImageList-pagination-btn"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryImageList;
