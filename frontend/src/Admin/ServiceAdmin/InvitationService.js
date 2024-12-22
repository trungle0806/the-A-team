// InvitationService.js

class InvitationService {
    constructor(apiUrl) {
        this.apiUrl = "http://localhost:5024";
    }

    // Get all invitations with optional search query
    async getAllInvitations(searchQuery = "") {
        const response = await fetch(`${this.apiUrl}/api/Invitation?searchQuery=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch invitations');
        }

        return await response.json();
    }

    // Get invitation by ID
    async getInvitationById(id) {
        const response = await fetch(`${this.apiUrl}/api/Invitation/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch invitation');
        }

        return await response.json();
    }

    // Add a new invitation (Admin and NGO roles)
    async addInvitation(invitation) {
        const response = await fetch(`${this.apiUrl}/api/Invitation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(invitation),
        });

        if (!response.ok) {
            throw new Error('Failed to add invitation');
        }

        return await response.json();
    }

    // Update an existing invitation by ID (Admin and NGO roles)
    async updateInvitation(id, updatedInvitation) {
        const response = await fetch(`${this.apiUrl}/api/Invitation/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedInvitation),
        });

        if (!response.ok) {
            throw new Error('Failed to update invitation');
        }

        return await response.json();
    }

    // Delete an invitation by ID (Admin role only)
    async deleteInvitation(id) {
        const response = await fetch(`${this.apiUrl}/api/Invitation/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete invitation');
        }

        return true;
    }
}

export default InvitationService;
