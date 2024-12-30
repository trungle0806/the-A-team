import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Client/Home/Home";
import About from "./Client/About/About";
import Contact from "./Client/Contact/Contact";
import News from "./Client/News/News";
import LoginForm from "./Client/Login/LoginForm";
import RegisterForm from "./Client/Register/RegisterForm";
import ForgotAndResetPassword from "./Client/ForgotPassword/ForgotPassword";
import Authentication from "./Admin/Authentication/Authentication";
import AuthContext, { AuthProvider } from "./Context/AuthContext"; // Import AuthProvider
import Profile from "./Client/Profile/Profile";
import Favorites from "./Client/Favorites/Favorites";
import ProgramList from "./Client/ProgramList/ProgramList"; // Đảm bảo đúng path

// Admin routes
import Dashboard from "./Admin/Dashboard/Dashboard";
import CustomerManagement from "./Admin/Customer/CustomerManagement";
import GalleryImage from "./Admin/GalleryImage/Image";
import Inviation from "./Admin/Invitation/Invitation";
import Ngo from "./Admin/NGOs/Ngos";
import Partner from "./Admin/Partner/Partner";
import Program1 from "./Admin/Program1/Program1";
import ProgramDonation from "./Admin/ProgramDonation/Prodonation";
import Query from "./Admin/Query/Query";
import TransactionHistory from "./Admin/TransactionHistory/TransactionHistory";
import NGODetails from "./Admin/NGOs/NGODetails/NGODetails";
import ResetPassword from "./Client/ResetPassword/ResetPassword";
import { FavoritesProvider } from "./Context/FavoritesContext"; // Import FavoritesProvider
import Donate from "./Client/Donate/Donate";

import "./App.css"; // Ensure no duplicate imports

// Wrapper function to ensure AuthProvider and FavoritesProvider are available
function App() {
  const { auth } = useContext(AuthContext); // Access auth state

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/program" element={<ProgramList />} />
          <Route path="/donate/:programId" element={<Donate />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/forgot-password" element={<ForgotAndResetPassword />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Authentication />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="galleryimage" element={<GalleryImage />} />
            <Route path="inviation" element={<Inviation />} />
            <Route path="ngo" element={<Ngo />} />
            <Route path="ngo-details/:id" element={<NGODetails />} />
            <Route path="partner" element={<Partner />} />
            <Route path="program1" element={<Program1 />} />
            <Route path="programDonation" element={<ProgramDonation />} />
            <Route path="query" element={<Query />} />
            <Route path="transactionhistory" element={<TransactionHistory />} />
          </Route>

          {/* Reset Password Route */}
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Wrap App with AuthProvider and FavoritesProvider
export default function WrappedApp() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        {" "}
        {/* Wrap with FavoritesProvider */}
        <App />
      </FavoritesProvider>
    </AuthProvider>
  );
}
