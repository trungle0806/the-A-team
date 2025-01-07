import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './Ngo.css';
import Header from './Header';
import Sidebar from './Sidebar';

function Ngo() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve 'authToken'
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Validate token expiration
        const isTokenValid = decodedToken.exp * 1000 > Date.now();
        if (isTokenValid) {
          setUserRole(decodedToken.Role); // Set role from token
        } else {
          console.error('Token has expired.');
          localStorage.removeItem('authToken'); // Remove expired token
          setUserRole('');
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        localStorage.removeItem('authToken'); // Remove invalid token
        setUserRole('');
      }
    } else {
      console.error('No token found.');
      setUserRole('');
    }
  }, []);

  // Render loading state while role is being determined
  if (userRole === null) {
    return <div>Loading...</div>;
  }

  // Redirect if the user is not an NGO
  if (userRole !== 'NGO') {
    return <Navigate to="/404" />;
  }

  return (
    <div className="grid-container">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} toggleSidebar={toggleSidebar} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Ngo;
