import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import './Dashboard.css';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  // Dữ liệu biểu đồ
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [12000, 19000, 3000, 5000, 20000, 30000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình biểu đồ
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Overview",
      },
    },
  };

  return (
    <div className="dashboard-container">
      {/* Tiêu đề */}
      <header className="dashboard-header">
        <h1 className="dashboard-name">Admin Dashboard</h1>
        <p>Welcome to the admin panel, where you can monitor all activities.</p>
      </header>

      {/* Các thẻ thống kê */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>1,254</p>
        </div>
        <div className="stat-card">
          <h3>New Customers</h3>
          <p>327</p>
        </div>
        <div className="stat-card">
          <h3>Sales</h3>
          <p>$45,632</p>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p>12</p>
        </div>
      </section>

      {/* Biểu đồ và hoạt động gần đây */}
      <section className="dashboard-content">
        <div className="dashboard-chart">
          <h3 className="dashboard-sale">Monthly Sales</h3>
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="recent-activity">
          <h3 className="dashboard-recent">Recent Activities</h3>
          <table className="dashboard-table">
            <thead className="dashboard-thead">
              <tr className="dashboard-tr">
                <th>Date</th>
                <th>Activity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="dashboard-tr1">
                <td>2024-11-18</td>
                <td>Added new user</td>
                <td>Completed</td>
              </tr>
              <tr className="dashboard-tr2">
                <td>2024-11-17</td>
                <td>Generated sales report</td>
                <td>In Progress</td>
              </tr>
              <tr className="dashboard-tr3">
                <td>2024-11-16</td>
                <td>Updated product details</td>
                <td>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
