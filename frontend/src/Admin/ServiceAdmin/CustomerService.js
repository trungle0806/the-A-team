// customerService.js

class CustomerService {
    constructor(apiUrl) {
        this.apiUrl = "http://localhost:5024";
    }

    // Decode JWT token to get user role
    getUserRole() {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload from token
        return payload.role; // Assumes `role` field is present in the token payload
    }

    // Example method to ensure admin access
    async ensureAdminAccess() {
        const role = this.getUserRole();
        if (role !== 'Admin') {
            throw new Error('Access denied. Admins only.');
        }
    }
    async getAllCustomers() {
        const response = await fetch(`${this.apiUrl}/api/customer/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch customers');
        }
        return await response.json();
    }

    async getCustomerById(id) {
        const response = await fetch(`${this.apiUrl}/api/customer/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch customer');
        }
        return await response.json();
    }

    async searchCustomers(query) {
        const response = await fetch(`${this.apiUrl}/api/customer?searchQuery=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to search customers');
        }
        return await response.json();
    }

    async addCustomer(customer) {
        const response = await fetch(`${this.apiUrl}/api/customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }
        return await response.json();
    }

    async updateCustomer(id, customer) {
        const response = await fetch(`${this.apiUrl}/api/customer/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            throw new Error('Failed to update customer');
        }
        return await response.json();
    }

    async deleteCustomer(id) {
        const response = await fetch(`${this.apiUrl}/api/customer/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete customer');
        }
        return true;
    }
}

export default CustomerService;
