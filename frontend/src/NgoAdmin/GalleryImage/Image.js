import React, { useState, useEffect } from 'react';
import { getGalleryImages, getGalleryImageById, addGalleryImage, updateGalleryImage, deleteGalleryImage } from '../ServiceNgoadmin/GalleryImageService';
import './Image.css';

const GalleryImageAdmin = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState(new FormData());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    const fetchGalleryImages = async () => {
        try {
            setLoading(true);
            const images = await getGalleryImages();
            setGalleryImages(images);
        } catch (error) {
            console.error('Lỗi khi lấy gallery images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewImage = async (id) => {
        try {
            const image = await getGalleryImageById(id);
            setSelectedImage(image);
        } catch (error) {
            console.error('Lỗi khi lấy gallery image:', error);
        }
    };

    const handleAddImage = async () => {
        try {
            await addGalleryImage(formData);
            fetchGalleryImages();
            setFormData(new FormData());
        } catch (error) {
            console.error('Lỗi khi thêm gallery image:', error);
        }
    };

    const handleUpdateImage = async (id) => {
        try {
            await updateGalleryImage(id, formData);
            fetchGalleryImages();
            setSelectedImage(null);
        } catch (error) {
            console.error('Lỗi khi cập nhật gallery image:', error);
        }
    };

    const handleDeleteImage = async (id) => {
        try {
            await deleteGalleryImage(id);
            fetchGalleryImages();
        } catch (error) {
            console.error('Lỗi khi xóa gallery image:', error);
        }
    };

    return (
        <div className="gallery-image-admin">
            <h2 className="gallery-header">Gallery Images</h2>

            {loading ? (
                <p className="loading-text">Đang tải...</p>
            ) : (
                <>
                    <div className="gallery-list">
                        <h3 className="list-title">Danh sách Gallery Images</h3>
                        <ul className="image-list">
                            {galleryImages.map((image) => (
                                <li key={image.id} className="image-item">
                                    <img src={image.url} alt={image.name} className="image-thumbnail" />
                                    <button className="view-button" onClick={() => handleViewImage(image.id)}>Xem</button>
                                    <button className="delete-button" onClick={() => handleDeleteImage(image.id)}>Xóa</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {selectedImage && (
                        <div className="image-details">
                            <h3 className="details-title">Chi tiết Gallery Image</h3>
                            <img src={selectedImage.url} alt={selectedImage.name} className="image-detail-thumbnail" />
                            <form className="update-form">
                                <label className="form-label">
                                    Tên:
                                    <input
                                        type="text"
                                        className="input-text"
                                        value={selectedImage.name}
                                        onChange={(e) => setSelectedImage({ ...selectedImage, name: e.target.value })}
                                    />
                                </label>
                                <button type="button" className="update-button" onClick={() => handleUpdateImage(selectedImage.id)}>
                                    Cập nhật
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="add-image">
                        <h3 className="add-title">Thêm Gallery Image mới</h3>
                        <form
                            className="add-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddImage();
                            }}
                        >
                            <label className="form-label">
                                Tải ảnh lên:
                                <input
                                    type="file"
                                    className="file-input"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                />
                            </label>
                            <button type="submit" className="add-button1">Thêm ảnh</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default GalleryImageAdmin;
