import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import DonationHistory from "./DonationHistory/DonationHistory";
import EditProfile from "./EditProfile/EditProfile"; // Ensure correct path
import TabNavigation from "./TabNavigation/TabNavigation";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Navigate to login if no token
    } else {
      fetch("http://localhost:5024/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Switch tab when user clicks
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading when fetching data
  }

  // Ensure userData is available before attempting to access donations
  const donations = userData?.donations || []; // Default to empty array if donations is null or undefined

  return (
    <div className="profile-container">
      <h1>Profile Information</h1>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Render tabs based on activeTab */}
      {activeTab === "info" && userData && <ProfileInfo userData={userData} />}
      {activeTab === "edit" && userData && <EditProfile userData={userData} />}

      {/* Show donation history or message only on the donations tab */}
      {activeTab === "donations" && (
        <>
          {donations.length > 0 ? (
            <DonationHistory donations={donations} />
          ) : (
            <p>No donation history available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
