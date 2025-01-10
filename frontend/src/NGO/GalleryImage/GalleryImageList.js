import React, { useEffect, useState } from "react";
import {
  fetchGalleryImages,
  deleteGalleryImage,
} from "../Service/GalleryImageService";
import GalleryImageForm from "./GalleryImageForm";

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
    // Handle save functionality here.
    console.log("Saved data:", formData);
    await loadGalleryImages();
    setIsEditing(false);
    setEditData(null);
  };

  return (
    <div>
      <h1>Gallery Images</h1>
      <input
        type="text"
        placeholder="Search by caption"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {!isEditing ? (
        <GalleryImageForm onSubmit={handleSave} />
      ) : (
        <GalleryImageForm onSubmit={handleSave} initialData={editData} />
      )}
      <ul>
        {galleryImages.map((image) => (
          <li key={image.imageId}>
            {image.fileName ? (
              <img
                src={URL.createObjectURL(new Blob([image.fileName]))}
                alt={image.caption}
                style={{ width: "100px" }}
              />
            ) : (
              <p>No image available</p>
            )}
            <p>{image.caption}</p>
            <button onClick={() => handleEdit(image)}>Edit</button>
            <button onClick={() => handleDelete(image.imageId)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryImageList;
