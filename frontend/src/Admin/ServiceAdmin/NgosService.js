// NGOService.js

class NGOService {
    constructor(apiUrl) {
        this.apiUrl = "http://localhost:5024";
    }

    // Get all NGOs with optional search query
    async getAllNGOs(searchQuery = "") {
        const response = await fetch(`${this.apiUrl}/api/NGO?searchQuery=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch NGOs');
        }

        return await response.json();
    }

    // Get NGO by ID
    async getNGOById(id) {
        const response = await fetch(`${this.apiUrl}/api/NGO/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch NGO');
        }

        return await response.json();
    }

    // Add a new NGO (Admin role only)
    async addNGO(ngo) {
        const response = await fetch(`${this.apiUrl}/api/NGO`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(ngo),
        });

        if (!response.ok) {
            throw new Error('Failed to add NGO');
        }

        return await response.json();
    }

    // Update an existing NGO by ID (Admin and NGO roles)
    async updateNGO(id, updatedNGO) {
        const response = await fetch(`${this.apiUrl}/api/NGO/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedNGO),
        });

        if (!response.ok) {
            throw new Error('Failed to update NGO');
        }

        return await response.json();
    }

    // Delete an NGO by ID (Admin role only)
    async deleteNGO(id) {
        const response = await fetch(`${this.apiUrl}/api/NGO/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete NGO');
        }

        return true;
    }
}

export default NGOService;
