import React, { useState } from "react";
import "./GalleryImageList.css";

const GalleryImageForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    caption: initialData.caption || "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.caption && formData.file) {
      onSubmit(formData);
    } else {
      alert("Please provide both caption and file.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="GalleryImageForm-container">
      <div className="GalleryImageForm-input-container">
        <label className="GalleryImageForm-label">
          Caption:
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            className="GalleryImageForm-input"
          />
        </label>
      </div>
      <div className="GalleryImageForm-input-container">
        <label className="GalleryImageForm-label">
          File:
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="GalleryImageForm-file-input"
          />
        </label>
      </div>
      <button type="submit" className="GalleryImageForm-submit-btn">
        Save
      </button>
    </form>
  );
};

export default GalleryImageForm;
