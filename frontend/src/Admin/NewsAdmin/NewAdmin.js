import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewAdmin.css";

const API_URL = "http://localhost:5000/api/news";

function News() {
  const [newsList, setNewsList] = useState([]); // Danh sách tin tức
  const [newsTitle, setNewsTitle] = useState("");
  const [newsAuthor, setNewsAuthor] = useState("");
  const [newsDate, setNewsDate] = useState("");
  const [newsSummary, setNewsSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Lấy danh sách tin tức từ API
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setNewsList(response.data);
    } catch (err) {
      setError("Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchNews();
  }, []);

  // Thêm tin tức mới
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNews = {
      title: newsTitle,
      author: newsAuthor,
      date: newsDate,
      summary: newsSummary,
    };

    try {
      const response = await axios.post(API_URL, newNews);
      if (response.status === 200) {
        setMessage("News added successfully!");
        setNewsTitle("");
        setNewsAuthor("");
        setNewsDate("");
        setNewsSummary("");
        fetchNews(); // Làm mới danh sách tin tức
      }
    } catch (error) {
      setMessage("Error adding news");
    }
  };

  return (
    <div className="news-container">
      <header>
        <h1>News Management</h1>
        <p>Add and manage news articles here.</p>
      </header>

      {/* Form thêm tin tức */}
      <form onSubmit={handleSubmit} className="news-form">
        <input
          type="text"
          placeholder="News Title"
          value={newsTitle}
          onChange={(e) => setNewsTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newsAuthor}
          onChange={(e) => setNewsAuthor(e.target.value)}
          required
        />
        <input
          type="date"
          value={newsDate}
          onChange={(e) => setNewsDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Summary"
          value={newsSummary}
          onChange={(e) => setNewsSummary(e.target.value)}
          required
        />
        <button type="submit">Add News</button>
      </form>

      {message && <p className="message">{message}</p>}

      {/* Hiển thị danh sách tin tức */}
      {loading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="news-list">
          <h2>Existing News</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {newsList.length > 0 ? (
                newsList.map((news) => (
                  <tr key={news.id}>
                    <td>{news.title}</td>
                    <td>{news.author}</td>
                    <td>{new Date(news.date).toLocaleDateString()}</td>
                    <td>{news.summary}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No news found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default News;

