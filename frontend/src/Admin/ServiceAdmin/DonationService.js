// DonationService.js

class DonationService {
    constructor(apiUrl) {
        this.apiUrl = "http://localhost:5024";
    }

    // Get all donations with optional search query
    async getAllDonations(searchQuery = "") {
        const response = await fetch(`${this.apiUrl}/api/ProgramDonation?searchQuery=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch donations');
        }

        return await response.json();
    }

    // Get donation by ID
    async getDonationById(id) {
        const response = await fetch(`${this.apiUrl}/api/ProgramDonation/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch donation');
        }

        return await response.json();
    }

    // Add a new donation (Admin and NGO roles)
    async addDonation(donation) {
        const response = await fetch(`${this.apiUrl}/api/ProgramDonation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(donation),
        });

        if (!response.ok) {
            throw new Error('Failed to add donation');
        }

        return await response.json();
    }

    // Update an existing donation by ID (Admin and NGO roles)
    async updateDonation(id, updatedDonation) {
        const response = await fetch(`${this.apiUrl}/api/ProgramDonation/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedDonation),
        });

        if (!response.ok) {
            throw new Error('Failed to update donation');
        }

        return await response.json();
    }

    // Delete a donation by ID (Admin role only)
    async deleteDonation(id) {
        const response = await fetch(`${this.apiUrl}/api/ProgramDonation/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete donation');
        }

        return true;
    }
}

export default DonationService;
