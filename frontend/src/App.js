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
import ProgramList from "./Client/ProgramList/ProgramList";
import Donate from "./Client/Donate/Donate";
import ThankYouBill from "./Client/Bill/ThankYouBill";

import { FavoritesProvider } from "./Context/FavoritesContext"; // Import FavoritesProvider

// Admin routes
import Dashboard from "./Admin/Dashboard/Dashboard";
import CustomerManagement from "./Admin/Customer/CustomerManagement";
import CustomerNgo from "./Admin/CustomerNgo/CustomerNgo";
import Inviation from "./Admin/Invitation/Invitation";
import Partner from "./Admin/Partner/Partner";
import ProgramDonation from "./Admin/ProgramDonation/Prodonation";
import CensorNgo from "./Admin/CensorNgo/CensorNgo";
import TransactionHistory from "./Admin/TransactionHistory/TransactionHistory";
import ResetPassword from "./Client/ResetPassword/ResetPassword";

// Ngo admin routes
import Ngoadmin from "./NgoAdmin/Ngoad";
import GalleryImage from "./NgoAdmin/GalleryImage/Image";
import Ngos from "./NgoAdmin/NGOs/Ngos";
import NgoDetails from "./NgoAdmin/NGOs/NGODetails/NGODetails";
import Program1 from "./NgoAdmin/Program1/Program1";
import Query from "./NgoAdmin/Query/Query"

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
          <Route path="/thank-you-bill" element={<ThankYouBill />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Authentication />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="customerngo" element={<CustomerNgo />} />
            <Route path="inviation" element={<Inviation />} />
            <Route path="partner" element={<Partner />} />
            <Route path="programDonation" element={<ProgramDonation />} />
            <Route path="censorngo" element={<CensorNgo />} />
            <Route path="transactionhistory" element={<TransactionHistory />} />
          </Route>

          <Route path="/ngo" element={<Ngoadmin />}>
            <Route path="galleryimage" element={<GalleryImage />} />
            <Route path="ngos" element={<Ngos />} />
            <Route path="ngodetails" element={<NgoDetails />} />
            <Route path="program1" element={<Program1 />} />
            <Route path="query" element={<Query />} />
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
        <App />
      </FavoritesProvider>
    </AuthProvider>
  );
}
