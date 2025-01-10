import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Caption:
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          File:
          <input type="file" name="file" onChange={handleFileChange} />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default GalleryImageForm;
