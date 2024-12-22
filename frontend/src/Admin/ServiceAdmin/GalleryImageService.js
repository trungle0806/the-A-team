// GalleryImageService.js

class GalleryImageService {
    constructor(apiUrl) {
        this.apiUrl = "http://localhost:5024";
    }

    // Get all gallery images with optional search query
    async getAllGalleryImages(searchQuery = "") {
        const response = await fetch(`${this.apiUrl}/api/GalleryImage?searchQuery=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch gallery images');
        }

        return await response.json();
    }

    // Get gallery image by ID
    async getGalleryImageById(id) {
        const response = await fetch(`${this.apiUrl}/api/GalleryImage/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch gallery image');
        }

        return await response.json();
    }

    // Add a new gallery image (Admin and NGO roles)
    async addGalleryImage(galleryImage) {
        const response = await fetch(`${this.apiUrl}/api/GalleryImage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(galleryImage),
        });

        if (!response.ok) {
            throw new Error('Failed to add gallery image');
        }

        return await response.json();
    }

    // Update an existing gallery image by ID (Admin and NGO roles)
    async updateGalleryImage(id, updatedGalleryImage) {
        const response = await fetch(`${this.apiUrl}/api/GalleryImage/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedGalleryImage),
        });

        if (!response.ok) {
            throw new Error('Failed to update gallery image');
        }

        return await response.json();
    }

    // Delete a gallery image by ID (Admin role only)
    async deleteGalleryImage(id) {
        const response = await fetch(`${this.apiUrl}/api/GalleryImage/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete gallery image');
        }

        return true;
    }
}

export default GalleryImageService;
