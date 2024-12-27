import React, { useState, useEffect } from 'react';
import { getQueries, addQuery, updateQuery, deleteQuery } from '../ServiceAdmin/QueryService';
import './Query.css';

const QueriesAdmin = () => {
  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState({ title: '', description: '', customerId: '' });
  const [editingQuery, setEditingQuery] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch queries on component mount
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const data = await getQueries(searchQuery);
        const queryList = mapQueryData(data); // Ánh xạ dữ liệu trả về
        setQueries(queryList);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };
  
    fetchQueries();
  }, [searchQuery]);
  
  const mapQueryData = (data) => {
    return data?.$values.map((item) => ({
      id: item.queryId,
      title: item.subject,
      description: item.queryText,
      customerId: item.customerId,
      status: item.status,
      createdAt: item.createdAt,
    })) || [];
  };

  // Handle adding a new query
  const handleAddQuery = async () => {
    try {
      const payload = {
        subject: newQuery.title,
        queryText: newQuery.description,
        customerId: newQuery.customerId,
      };
      await addQuery(payload);
      setNewQuery({ title: '', description: '', customerId: '' });
      const data = await getQueries(searchQuery); // Làm mới danh sách query
      setQueries(mapQueryData(data));
    } catch (error) {
      console.error('Error adding query:', error);
    }
  };
  
  const handleUpdateQuery = async () => {
    if (editingQuery) {
      try {
        const payload = {
          subject: editingQuery.title,
          queryText: editingQuery.description,
          customerId: editingQuery.customerId,
          status: editingQuery.status, // Giữ nguyên trạng thái hiện tại
        };
        await updateQuery(editingQuery.id, payload);
        setEditingQuery(null); // Reset sau khi cập nhật
        const data = await getQueries(searchQuery); // Làm mới danh sách query
        setQueries(mapQueryData(data));
      } catch (error) {
        console.error('Error updating query:', error);
      }
    }
  };
  

  // Handle deleting a query
  const handleDeleteQuery = async (id) => {
    try {
      await deleteQuery(id);
      const data = await getQueries(searchQuery);  // Refresh query list
      setQueries(data);
    } catch (error) {
      console.error('Error deleting query:', error);
    }
  };

  return (
    <div className="queries-admin">
      <h2 className="queries-title">Queries Management</h2>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search queries..."
        />
        <button className="search-button">Search</button>
      </div>

      {/* Add Query Form */}
      <div className="add-query-form">
        <h3>Add New Query</h3>
        <input
          type="text"
          placeholder="Query Title"
          value={newQuery.title}
          onChange={(e) => setNewQuery({ ...newQuery, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newQuery.description}
          onChange={(e) => setNewQuery({ ...newQuery, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Customer ID"
          value={newQuery.customerId}
          onChange={(e) => setNewQuery({ ...newQuery, customerId: e.target.value })}
        />
        <button className="add-button" onClick={handleAddQuery}>Add Query</button>
      </div>

      {/* Query List */}
      <div className="query-list">
        <h3>Existing Queries</h3>
        <ul>
          {queries.map((query) => (
            <li key={query.id} className="query-item">
              <div>
                <h4>{query.title}</h4>
                <p>{query.description}</p>
                <p>Customer ID: {query.customerId}</p>
                <p>Status: {query.status}</p>
                <p>Created At: {new Date(query.createdAt).toLocaleString()}</p>
              </div>
              <button
                className="edit-button"
                onClick={() => setEditingQuery(query)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteQuery(query.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Query Form */}
      {editingQuery && (
        <div className="edit-query-form">
          <h3>Edit Query</h3>
          <input
            type="text"
            placeholder="Query Title"
            value={editingQuery.title}
            onChange={(e) => setEditingQuery({ ...editingQuery, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={editingQuery.description}
            onChange={(e) => setEditingQuery({ ...editingQuery, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Customer ID"
            value={editingQuery.customerId}
            onChange={(e) => setEditingQuery({ ...editingQuery, customerId: e.target.value })}
          />
          <button className="update-button" onClick={handleUpdateQuery}>Update Query</button>
        </div>
      )}
    </div>
  );
};

export default QueriesAdmin;
